/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import type { TabReader, SelectedTab } from "@/src/ports/tabs.ts";

export class ChromeTabReader implements TabReader {
  async selectedTabs(): Promise<SelectedTab[]> {
    return chrome.tabs.query({ highlighted: true, currentWindow: true });
  }
}
