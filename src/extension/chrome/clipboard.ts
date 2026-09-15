/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import type { ClipboardWriter } from "@/src/ports/clipboard.ts";

export class DomClipboardWriter implements ClipboardWriter {
  private readonly textArea: HTMLTextAreaElement;

  constructor(textArea: HTMLTextAreaElement) {
    this.textArea = textArea;
  }

  async write(text: string): Promise<boolean> {
    this.textArea.value = text;
    this.textArea.select();

    try {
      return document.execCommand("copy");
    } finally {
      this.textArea.value = "";
    }
  }
}
