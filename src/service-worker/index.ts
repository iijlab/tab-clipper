import { copySelectedTabs, registerServiceWorker } from "@/src/service-worker/register.ts";
import { ChromeOffscreenDocumentManager } from "@/src/extension/chrome/offscreen.ts";
import { ChromeContextMenuManager } from "@/src/extension/chrome/context-menu.ts";

const offscreen = new ChromeOffscreenDocumentManager();

registerServiceWorker(new ChromeContextMenuManager(), copySelectedTabs(offscreen));
