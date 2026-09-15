import { describe, expect, it, vi } from "vitest";
import { copyClipboard } from "@/src/offscreen/clipboard.ts";
import type { ClipboardWriter } from "@/src/ports/clipboard.ts";

describe("copyClipboard", () => {
  const textArea = document.createElement("textarea");

  it("returns success when the clipboard adapter copies the text", async () => {
    const write = vi.fn().mockResolvedValue(true);
    const clipboard: ClipboardWriter = { write };

    await expect(copyClipboard(textArea, "copied text", clipboard)).resolves.toEqual({
      success: true,
      reason: "",
    });
    expect(write).toHaveBeenCalledWith("copied text");
  });

  it("returns a failure when the clipboard adapter cannot copy", async () => {
    const clipboard: ClipboardWriter = { write: vi.fn().mockResolvedValue(false) };

    await expect(copyClipboard(textArea, "copied text", clipboard)).resolves.toEqual({
      success: false,
      reason: "Copying to the clipboard failed",
    });
  });

  it("converts adapter exceptions into a failure response", async () => {
    const clipboard: ClipboardWriter = {
      write: vi.fn().mockRejectedValue(new Error("security error")),
    };

    await expect(copyClipboard(textArea, "copied text", clipboard)).resolves.toEqual({
      success: false,
      reason: "Caught an exception: security error",
    });
  });

  it("uses an unknown reason for non-Error exceptions", async () => {
    const clipboard: ClipboardWriter = {
      write: vi.fn().mockRejectedValue("security error"),
    };

    await expect(copyClipboard(textArea, "copied text", clipboard)).resolves.toEqual({
      success: false,
      reason: "Caught an exception: unknown",
    });
  });
});
