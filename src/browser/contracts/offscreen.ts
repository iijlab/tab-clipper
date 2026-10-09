/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

export type OffscreenDocumentOptions = {
  reasons: ["CLIPBOARD"];
  url: string;
  justification: string;
};

export interface OffscreenDocumentManager {
  ensure(options: OffscreenDocumentOptions): Promise<void>;
  close(): Promise<void>;
}
