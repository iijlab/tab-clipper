/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

import type { Notification, Notifier } from "@/src/ports/notifications.ts";

export class ChromeNotifier implements Notifier {
  async show(id: string, notification: Notification): Promise<void> {
    await chrome.notifications.create(id, notification);
  }
}
