export async function offscreenNumbers(url: string): Promise<number> {
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [chrome.runtime.getURL(url)],
  });

  return contexts.length;
}

export async function offscreenCreate(params: chrome.offscreen.CreateParameters) {
  const n = await offscreenNumbers(params.url);
  if (n > 0) {
    return;
  }
  await chrome.offscreen.createDocument(params);
}
