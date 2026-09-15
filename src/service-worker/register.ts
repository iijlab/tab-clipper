import {
  recvOffscreen as defaultReceiveOffscreen,
  sendOffscreen as defaultSendOffscreen,
  type CopyClipboardResponse,
} from "@/src/messages.ts";
import type { OffscreenDocumentManager, OffscreenDocumentOptions } from "@/src/ports/offscreen.ts";
import type { ContextMenuClick, ContextMenuManager } from "@/src/ports/context-menu.ts";

export type CopySelectedTabs = () => Promise<void>;
export type SendOffscreen = () => Promise<CopyClipboardResponse>;
export type ReceiveOffscreen = (response: CopyClipboardResponse) => Promise<void>;

const offscreenOptions: OffscreenDocumentOptions = {
  reasons: ["CLIPBOARD"],
  url: "offscreen.html",
  justification: "Copying tab info to clipboard",
};

export function copySelectedTabs(offscreen: OffscreenDocumentManager): CopySelectedTabs {
  return createCopySelectedTabs(offscreen, defaultSendOffscreen, (response) =>
    defaultReceiveOffscreen(response, undefined, offscreen),
  );
}

export function createCopySelectedTabs(
  offscreen: OffscreenDocumentManager,
  sendOffscreen: SendOffscreen,
  receiveOffscreen: ReceiveOffscreen,
): CopySelectedTabs {
  return async () => {
    await offscreen.ensure(offscreenOptions);
    const response = await sendOffscreen();
    await receiveOffscreen(response);
  };
}

export function registerServiceWorker(
  contextMenus: ContextMenuManager,
  copy: CopySelectedTabs,
): void {
  contextMenus.onInstalled(() => {
    // Avoid duplicate errors
    void (async () => {
      await contextMenus.removeAll();
      contextMenus.create({
        id: "copy-selected-tabs",
        title: "Copy to clipboard",
        contexts: ["all"],
      });
    })();
  });

  contextMenus.onClicked((info: ContextMenuClick) => {
    if (info.menuItemId === "copy-selected-tabs") {
      // Avoid oxlint: typescript(no-floating-promises)
      void copy();
    }
  });
}
