export type SelectedTab = {
  title?: string;
  url?: string;
};

export interface TabReader {
  selectedTabs(): Promise<SelectedTab[]>;
}
