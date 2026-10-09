/**
 * @copyright Internet Initiative Japan Inc. All rights reserved.
 * @license BSD-3-Clause
 */

export type MessageResponseSender<Response> = (response: Response) => void;

export type MessageListener<Message, Response> = (
  message: Message,
  sendResponse: MessageResponseSender<Response>,
) => boolean | void;

export interface RuntimeMessenger<Message, Response> {
  send(message: Message): Promise<Response>;
  listen(listener: MessageListener<Message, Response>): void;
}
