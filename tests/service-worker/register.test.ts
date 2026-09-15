/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import { describe, expect, it, vi } from "vitest";
import { createCopySelectedTabs, registerServiceWorker } from "@/src/service-worker/register.ts";
import type { ContextMenuClick, ContextMenuManager } from "@/src/ports/context-menu.ts";
import type { OffscreenDocumentManager } from "@/src/ports/offscreen.ts";
import type { CopyClipboardResponse } from "@/src/messages.ts";

describe("registerServiceWorker", () => {
  it("recreates the copy menu after installation", async () => {
    let installed: (() => void) | undefined;
    const removeAll = vi.fn().mockResolvedValue(undefined);
    const create = vi.fn();
    const contextMenus: ContextMenuManager = {
      onInstalled: (listener) => {
        installed = listener;
      },
      onClicked: vi.fn(),
      removeAll,
      create,
    };

    registerServiceWorker(contextMenus, vi.fn());
    installed?.();
    await vi.waitFor(() => expect(create).toHaveBeenCalled());

    expect(removeAll).toHaveBeenCalledOnce();
    expect(create).toHaveBeenCalledWith({
      id: "copy-selected-tabs",
      title: "Copy to clipboard",
      contexts: ["all"],
    });
  });

  it("copies only when the target menu item is clicked", async () => {
    let clicked: ((info: ContextMenuClick) => void) | undefined;
    const copy = vi.fn().mockResolvedValue(undefined);
    const contextMenus: ContextMenuManager = {
      onInstalled: vi.fn(),
      onClicked: (listener) => {
        clicked = listener;
      },
      removeAll: vi.fn().mockResolvedValue(undefined),
      create: vi.fn(),
    };

    registerServiceWorker(contextMenus, copy);
    clicked?.({ menuItemId: "other-item" });
    expect(copy).not.toHaveBeenCalled();

    clicked?.({ menuItemId: "copy-selected-tabs" });
    await vi.waitFor(() => expect(copy).toHaveBeenCalledOnce());
  });
});

describe("createCopySelectedTabs", () => {
  it("ensures the offscreen document and completes the copy workflow", async () => {
    const ensure = vi.fn().mockResolvedValue(undefined);
    const offscreen: OffscreenDocumentManager = {
      ensure,
      close: vi.fn(),
    };
    const response: CopyClipboardResponse = { success: true, reason: "" };
    const send = vi.fn().mockResolvedValue(response);
    const receive = vi.fn().mockResolvedValue(undefined);

    await createCopySelectedTabs(offscreen, send, receive)();

    expect(ensure).toHaveBeenCalledWith({
      reasons: ["CLIPBOARD"],
      url: "offscreen.html",
      justification: "Copying tab info to clipboard",
    });
    expect(send).toHaveBeenCalledOnce();
    expect(receive).toHaveBeenCalledWith(response);
  });
});
