/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import { ChromeNotifier } from "@/src/extension/chrome/notifications.ts";
import type { Notifier } from "@/src/ports/notifications.ts";
import { ChromeI18nProvider } from "@/src/extension/chrome/i18n.ts";
import type { I18nProvider } from "@/src/ports/i18n.ts";
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
  i18n: I18nProvider = new ChromeI18nProvider(),
) {
  if (!response.success) {
    await notifier.show("copy-error-id", {
      type: "basic",
      iconUrl: "icons/error-48x48.png",
      title: i18n.getMessage("notifier_title"),
      message: i18n.getMessage("notifier_message", response.reason),
      priority: 2,
    });
  }

  await offscreen.close();
}
