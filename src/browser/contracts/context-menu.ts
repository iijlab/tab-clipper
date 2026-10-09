/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

export type ContextMenuClick = {
  menuItemId: string | number;
};

export type ContextMenu = {
  id: string;
  title: string;
  contexts: ["all"];
};

export interface ContextMenuManager {
  onInstalled(listener: () => void): void;
  onClicked(listener: (info: ContextMenuClick) => void): void;
  removeAll(): Promise<void>;
  create(menu: ContextMenu): void;
}
