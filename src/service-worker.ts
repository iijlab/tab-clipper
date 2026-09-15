import { recvOffscreen, sendOffscreen } from "@/src/messages.ts";
import { offscreenCreate } from "@/src/offscreen/offscreen.ts";

chrome.runtime.onInstalled.addListener(() => {
  // Avoid duplicate errors
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "copy-selected-tabs",
      title: "Copy to clipboard",
      contexts: ["all"],
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, _tab) => {
  if (info.menuItemId === "copy-selected-tabs") {
    // Avoid oxlint: typescript(no-floating-promises)
    void (async () => {
      await offscreenCreate({
        reasons: ["CLIPBOARD"],
        url: "offscreen.html",
        justification: "Copying tab info to clipboard",
      });
      const response = await sendOffscreen();
      await recvOffscreen(response);
    })();
  }
});
