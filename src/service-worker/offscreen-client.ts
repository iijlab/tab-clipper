/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import { ChromeNotifier } from "@/src/browser/chrome/notifications.ts";
import type { Notifier } from "@/src/browser/contracts/notifications.ts";
import { ChromeI18nProvider } from "@/src/browser/chrome/i18n.ts";
import type { I18nProvider } from "@/src/browser/contracts/i18n.ts";
import { ChromeOffscreenDocumentManager } from "@/src/browser/chrome/offscreen.ts";
import type { OffscreenDocumentManager } from "@/src/browser/contracts/offscreen.ts";
import { ChromeRuntimeMessenger } from "@/src/browser/chrome/runtime-messaging.ts";
import type { RuntimeMessenger } from "@/src/browser/contracts/runtime-messaging.ts";
import { ChromeTabReader } from "@/src/browser/chrome/tabs.ts";
import type { TabReader } from "@/src/browser/contracts/tabs.ts";
import type { CopyClipboardRequest, CopyClipboardResponse } from "@/src/protocol/messages.ts";

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
