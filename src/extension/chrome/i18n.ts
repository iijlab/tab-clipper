/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import type { I18nProvider } from "@/src/ports/i18n.ts";

export class ChromeI18nProvider implements I18nProvider {
  getMessage(name: string): string {
    return chrome.i18n.getMessage(name);
  }
}
