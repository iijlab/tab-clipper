export type CopyClipboardRequest = {
  type: string;
  text: string;
};

export type CopyClipboardResponse = {
  success: boolean;
  reason: string;
};

export async function sendOffscreen(): Promise<CopyClipboardResponse> {
  const tabs = await chrome.tabs.query({ highlighted: true, currentWindow: true });
  const textToCopy = tabs.map((t) => `${t.title}\n${t.url}`).join("\n\n");

  const request: CopyClipboardRequest = {
    type: "copy-to-clipboard",
    text: textToCopy,
  };

  return await chrome.runtime.sendMessage(request);
}

export async function recvOffscreen(response: CopyClipboardResponse) {
  if (!response.success) {
    await chrome.notifications.create("copy-error-id", {
      type: "basic",
      iconUrl: "icons/error-48x48.png",
      title: "Copy failed",
      message: `Please make your selection again and try once more.\nError: ${response.reason}\n`,
      priority: 2,
    });
  }

  await chrome.offscreen.closeDocument();
}
