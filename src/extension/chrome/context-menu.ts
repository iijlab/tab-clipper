import type {
  ContextMenu,
  ContextMenuClick,
  ContextMenuManager,
} from "@/src/ports/context-menu.ts";

export class ChromeContextMenuManager implements ContextMenuManager {
  onInstalled(listener: () => void): void {
    chrome.runtime.onInstalled.addListener(listener);
  }

  onClicked(listener: (info: ContextMenuClick) => void): void {
    chrome.contextMenus.onClicked.addListener((info) => listener(info));
  }

  async removeAll(): Promise<void> {
    await chrome.contextMenus.removeAll();
  }

  create(menu: ContextMenu): void {
    chrome.contextMenus.create(menu);
  }
}
