/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

export interface I18nProvider {
  getMessage(name: string, substitution?: string): string;
}
