/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import type { OffscreenDocumentManager, OffscreenDocumentOptions } from "@/src/ports/offscreen.ts";

export class ChromeOffscreenDocumentManager implements OffscreenDocumentManager {
  async ensure(options: OffscreenDocumentOptions): Promise<void> {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ["OFFSCREEN_DOCUMENT"],
      documentUrls: [chrome.runtime.getURL(options.url)],
    });

    if (contexts.length === 0) {
      await chrome.offscreen.createDocument(options);
    }
  }

  async close(): Promise<void> {
    await chrome.offscreen.closeDocument();
  }
}
