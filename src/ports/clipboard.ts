export interface ClipboardWriter {
  write(text: string): Promise<boolean>;
}
