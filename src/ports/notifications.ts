/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

export type Notification = {
  type: "basic";
  iconUrl: string;
  title: string;
  message: string;
  priority: number;
};

export interface Notifier {
  show(id: string, notification: Notification): Promise<void>;
}
