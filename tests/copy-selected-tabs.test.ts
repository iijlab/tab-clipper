import { describe, expect, test, vi } from "vitest";
import {
  copySelectedTabs,
  type ClipboardService,
  type TabService,
  formatTabs,
} from "@/src/copy-selected-tabs.ts";

describe("Test of formatTabs", () => {
  test("formats multiple tabs", () => {
    const result = formatTabs([
      {
        title: "Example Domain",
        url: "https://example.com",
      },
      {
        title: "example.jp",
        url: "https://example.jp",
      },
    ]);

    expect(result).toBe(
      ["Example Domain\nhttps://example.com\n", "example.jp\nhttps://example.jp\n"].join("\n"),
    );
  });

  test("handles undefined title and url", () => {
    const result = formatTabs([
      {
        title: undefined,
        url: undefined,
      },
    ]);

    expect(result).toBe("\n\n");
  });

  test("formats empty list", () => {
    expect(formatTabs([])).toBe("");
  });
});

describe("Test of copySelectedTabs", () => {
  test("copies formatted text", async () => {
    const tabService = {
      queryHighlightedTabs: vi.fn<TabService["queryHighlightedTabs"]>(),
    } satisfies TabService;
    const clipboard = {
      copy: vi.fn<ClipboardService["copy"]>(),
    } satisfies ClipboardService;

    tabService.queryHighlightedTabs.mockResolvedValue([
      {
        title: "Example Domain",
        url: "https://example.com",
      },
      {
        title: "example.jp",
        url: "https://example.jp",
      },
    ]);
    clipboard.copy.mockResolvedValue(undefined);
    await copySelectedTabs(tabService, clipboard);

    expect(tabService.queryHighlightedTabs).toHaveBeenCalledOnce();
    expect(clipboard.copy).toHaveBeenCalledWith(
      ["Example Domain\nhttps://example.com\n", "example.jp\nhttps://example.jp\n"].join("\n"),
    );
  });
});
