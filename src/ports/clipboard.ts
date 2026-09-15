/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

export interface ClipboardWriter {
  write(text: string): Promise<boolean>;
}
