/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import { describe, expect, it, vi } from "vitest";
import { receiveOffscreen, sendOffscreen } from "@/src/service-worker/offscreen-client.ts";
import type { CopyClipboardRequest, CopyClipboardResponse } from "@/src/protocol/messages.ts";
import type { Notifier } from "@/src/browser/contracts/notifications.ts";
import type { I18nProvider } from "@/src/browser/contracts/i18n.ts";
import type { OffscreenDocumentManager } from "@/src/browser/contracts/offscreen.ts";
import type { RuntimeMessenger } from "@/src/browser/contracts/runtime-messaging.ts";
import type { TabReader } from "@/src/browser/contracts/tabs.ts";

describe("sendOffscreen", () => {
  it("formats selected tabs and sends a clipboard request", async () => {
    const tabs: TabReader = {
      selectedTabs: vi.fn().mockResolvedValue([
        { title: "First tab", url: "https://example.com/first" },
        { title: "Second tab", url: "https://example.com/second" },
      ]),
    };
    const response: CopyClipboardResponse = { success: true, reason: "" };
    const send = vi.fn().mockResolvedValue(response);
    const messenger: RuntimeMessenger<CopyClipboardRequest, CopyClipboardResponse> = {
      send,
      listen: vi.fn(),
    };

    await expect(sendOffscreen(tabs, messenger)).resolves.toEqual(response);
    expect(send).toHaveBeenCalledWith({
      type: "copy-to-clipboard",
      text: ["First tab\nhttps://example.com/first", "Second tab\nhttps://example.com/second"].join(
        "\n\n",
      ),
    });
  });
});

describe("receiveOffscreen", () => {
  it("notifies on copy failure and closes the offscreen document", async () => {
    const show = vi.fn();
    const close = vi.fn();
    const notifier: Notifier = { show };
    const offscreen: OffscreenDocumentManager = { ensure: vi.fn(), close };
    const getMessage = vi.fn((name: string) => {
      if (name === "notifier_title") return "Copy failed";
      if (name === "notifier_message") {
        return "Please make your selection again and try once more.\nError: permission denied\n";
      }
      throw new Error(`Unexpected message key: ${name}`);
    });
    const i18n: I18nProvider = { getMessage };

    await receiveOffscreen(
      { success: false, reason: "permission denied" },
      notifier,
      offscreen,
      i18n,
    );

    expect(getMessage).toHaveBeenCalledTimes(2);
    expect(getMessage).toHaveBeenNthCalledWith(1, "notifier_title");
    expect(getMessage).toHaveBeenNthCalledWith(2, "notifier_message", "permission denied");
    expect(show).toHaveBeenCalledWith("copy-error-id", {
      type: "basic",
      iconUrl: "icons/error-48x48.png",
      title: "Copy failed",
      message: "Please make your selection again and try once more.\nError: permission denied\n",
      priority: 2,
    });
    expect(close).toHaveBeenCalledOnce();
  });

  it("closes the offscreen document without notifying on success", async () => {
    const show = vi.fn();
    const close = vi.fn();
    const notifier: Notifier = { show };
    const offscreen: OffscreenDocumentManager = { ensure: vi.fn(), close };
    const getMessage = vi.fn();
    const i18n: I18nProvider = { getMessage };

    await receiveOffscreen({ success: true, reason: "" }, notifier, offscreen, i18n);

    expect(show).not.toHaveBeenCalled();
    expect(getMessage).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledOnce();
  });
});
