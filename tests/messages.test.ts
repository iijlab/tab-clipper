/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import { describe, expect, it, vi } from "vitest";
import {
  receiveOffscreen,
  sendOffscreen,
  type CopyClipboardRequest,
  type CopyClipboardResponse,
} from "@/src/messages.ts";
import type { Notifier } from "@/src/ports/notifications.ts";
import type { OffscreenDocumentManager } from "@/src/ports/offscreen.ts";
import type { RuntimeMessenger } from "@/src/ports/runtime-messaging.ts";
import type { TabReader } from "@/src/ports/tabs.ts";

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

describe("recvOffscreen", () => {
  it("notifies on copy failure and closes the offscreen document", async () => {
    const show = vi.fn();
    const close = vi.fn();
    const notifier: Notifier = { show };
    const offscreen: OffscreenDocumentManager = { ensure: vi.fn(), close };

    await receiveOffscreen({ success: false, reason: "permission denied" }, notifier, offscreen);

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

    await receiveOffscreen({ success: true, reason: "" }, notifier, offscreen);

    expect(show).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledOnce();
  });
});
