/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

export type SelectedTab = {
  title?: string;
  url?: string;
};

export interface TabReader {
  selectedTabs(): Promise<SelectedTab[]>;
}
