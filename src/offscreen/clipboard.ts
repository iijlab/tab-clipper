/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import type { CopyClipboardResponse } from "@/src/messages.ts";
import { DomClipboardWriter } from "@/src/extension/chrome/clipboard.ts";
import type { ClipboardWriter } from "@/src/ports/clipboard.ts";

export async function copyClipboard(
  textArea: HTMLTextAreaElement,
  text: string,
  clipboard: ClipboardWriter = new DomClipboardWriter(textArea),
): Promise<CopyClipboardResponse> {
  try {
    const copied = await clipboard.write(text);
    return copied
      ? { success: true, reason: "" }
      : { success: false, reason: "Copying to the clipboard failed" };
  } catch (err) {
    // If an exception such as a security error occurs.
    if (err instanceof Error) {
      return { success: false, reason: `Caught an exception: ${err.message}` };
    }
    return { success: false, reason: "Caught an exception: unknown" };
  }
}
