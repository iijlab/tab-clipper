import { chromeTabService, debugClipboardService } from "@/src/chrome-services.ts";
import { copySelectedTabs } from "@/src/copy-selected-tabs.ts";

const menuItemId = "copy-selected-tabs";

chrome.runtime.onInstalled.addListener(() => {
  // Avoid duplicate errors
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: menuItemId,
      title: "Copy selected tab title and url",
      contexts: ["all"],
    });
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== menuItemId) {
    return;
  }
  await copySelectedTabs(chromeTabService, debugClipboardService);
});
