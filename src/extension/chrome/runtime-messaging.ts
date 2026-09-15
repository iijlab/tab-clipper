import type {
  MessageListener,
  MessageResponseSender,
  RuntimeMessenger,
} from "@/src/ports/runtime-messaging.ts";

export class ChromeRuntimeMessenger<Message, Response> implements RuntimeMessenger<
  Message,
  Response
> {
  async send(message: Message): Promise<Response> {
    return chrome.runtime.sendMessage(message);
  }

  listen(listener: MessageListener<Message, Response>): void {
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      const keepChannelOpen = listener(
        message as Message,
        sendResponse as MessageResponseSender<Response>,
      );
      return keepChannelOpen ?? false;
    });
  }
}
