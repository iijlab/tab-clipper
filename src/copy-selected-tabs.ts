export interface TabInfo {
  title?: string;
  url?: string;
}

export interface TabService {
  queryHighlightedTabs: () => Promise<TabInfo[]>;
}

export interface ClipboardService {
  copy: (text: string) => Promise<void>;
}

export function formatTabs(tabs: ReadonlyArray<TabInfo>): string {
  return tabs.map((tab) => `${tab.title ?? ""}\n${tab.url ?? ""}\n`).join("\n");
}

export async function copySelectedTabs(tabService: TabService, clipboard: ClipboardService) {
  const tabs = await tabService.queryHighlightedTabs();
  await clipboard.copy(formatTabs(tabs));
}
