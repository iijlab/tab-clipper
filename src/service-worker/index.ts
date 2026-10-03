/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import { copySelectedTabs, registerServiceWorker } from "@/src/service-worker/register.ts";
import { ChromeOffscreenDocumentManager } from "@/src/extension/chrome/offscreen.ts";
import { ChromeContextMenuManager } from "@/src/extension/chrome/context-menu.ts";
import { ChromeI18nProvider } from "@/src/extension/chrome/i18n.ts";

const offscreen = new ChromeOffscreenDocumentManager();

registerServiceWorker(
  new ChromeContextMenuManager(),
  copySelectedTabs(offscreen),
  new ChromeI18nProvider(),
);
