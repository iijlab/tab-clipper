import type { ClipboardService, TabService } from "@/src/copy-selected-tabs.ts";

export const chromeTabService: TabService = {
  queryHighlightedTabs: () => {
    return chrome.tabs.query({ highlighted: true, currentWindow: true });
  },
};

export const debugClipboardService: ClipboardService = {
  copy: async (text: string) => {
    console.debug(text);
  },
};
