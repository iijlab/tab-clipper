export type OffscreenDocumentOptions = {
  reasons: ["CLIPBOARD"];
  url: string;
  justification: string;
};

export interface OffscreenDocumentManager {
  ensure(options: OffscreenDocumentOptions): Promise<void>;
  close(): Promise<void>;
}
