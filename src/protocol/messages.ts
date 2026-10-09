/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

export type CopyClipboardRequest = {
  type: string;
  text: string;
};

export type CopyClipboardResponse = {
  success: boolean;
  reason: string;
};
