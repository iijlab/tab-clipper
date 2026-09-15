import { copyClipboard } from "@/src/offscreen/clipboard.ts";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "copy-to-clipboard") {
    const textArea = document.getElementById("sandbox") as HTMLTextAreaElement;
    // oxlint: typescript(no-floating-promises)
    void (async () => {
      const response = await copyClipboard(textArea, message.text);
      sendResponse(response);
    })();
  }

  // Necessary to avoid contention with other synchronous listeners and to preserve responses
  // intended for other listeners.
  return true;
});
