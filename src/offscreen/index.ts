/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import { copyClipboard } from "@/src/offscreen/clipboard.ts";
import { ChromeRuntimeMessenger } from "@/src/extension/chrome/runtime-messaging.ts";
import type { MessageListener } from "@/src/ports/runtime-messaging.ts";
import type { CopyClipboardRequest, CopyClipboardResponse } from "@/src/messages.ts";

const messenger = new ChromeRuntimeMessenger<CopyClipboardRequest, CopyClipboardResponse>();

const handleCopyRequest: MessageListener<CopyClipboardRequest, CopyClipboardResponse> = (
  message,
  sendResponse,
) => {
  if (message.type === "copy-to-clipboard") {
    const textArea = document.getElementById("sandbox") as HTMLTextAreaElement;
    // oxlint: typescript(no-floating-promises)
    void (async () => {
      const response = await copyClipboard(textArea, message.text);
      sendResponse(response);
    })();
  }

  // Necessary to avoid contention with other synchronous listeners and to preserve responses
  // intended for other listeners.
  return true;
};

messenger.listen(handleCopyRequest);
