import { ChromeNotifier } from "@/src/extension/chrome/notifications.ts";
import type { Notifier } from "@/src/ports/notifications.ts";
import { ChromeOffscreenDocumentManager } from "@/src/extension/chrome/offscreen.ts";
import type { OffscreenDocumentManager } from "@/src/ports/offscreen.ts";
import { ChromeRuntimeMessenger } from "@/src/extension/chrome/runtime-messaging.ts";
import type { RuntimeMessenger } from "@/src/ports/runtime-messaging.ts";
import { ChromeTabReader } from "@/src/extension/chrome/tabs.ts";
import type { TabReader } from "@/src/ports/tabs.ts";

export type CopyClipboardRequest = {
  type: string;
  text: string;
};

export type CopyClipboardResponse = {
  success: boolean;
  reason: string;
};

export async function sendOffscreen(
  tabsReader: TabReader = new ChromeTabReader(),
  messenger: RuntimeMessenger<
    CopyClipboardRequest,
    CopyClipboardResponse
  > = new ChromeRuntimeMessenger(),
): Promise<CopyClipboardResponse> {
  const tabs = await tabsReader.selectedTabs();
  const textToCopy = tabs.map((t) => `${t.title}\n${t.url}`).join("\n\n");

  const request: CopyClipboardRequest = {
    type: "copy-to-clipboard",
    text: textToCopy,
  };

  return await messenger.send(request);
}

export async function receiveOffscreen(
  response: CopyClipboardResponse,
  notifier: Notifier = new ChromeNotifier(),
  offscreen: OffscreenDocumentManager = new ChromeOffscreenDocumentManager(),
) {
  if (!response.success) {
    await notifier.show("copy-error-id", {
      type: "basic",
      iconUrl: "icons/error-48x48.png",
      title: "Copy failed",
      message: `Please make your selection again and try once more.\nError: ${response.reason}\n`,
      priority: 2,
    });
  }

  await offscreen.close();
}
