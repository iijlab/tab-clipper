import type { CopyClipboardResponse } from "@/src/messages.ts";

export async function copyClipboard(
  textArea: HTMLTextAreaElement,
  text: string,
): Promise<CopyClipboardResponse> {
  textArea.value = text;
  textArea.select();

  let response: CopyClipboardResponse;

  try {
    const ok = document.execCommand("copy");
    if (ok) {
      response = { success: true, reason: "" };
    } else {
      response = { success: false, reason: "Copying to the clipboard failed" };
    }
  } catch (err) {
    // If an exception such as a security error occurs.
    if (err instanceof Error) {
      response = { success: false, reason: `Caught an exception: ${err.message}` };
    } else {
      response = { success: false, reason: "Caught an exception: unknown" };
    }
  } finally {
    textArea.value = "";
  }

  return response;
}
