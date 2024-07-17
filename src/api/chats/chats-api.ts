import { IP_V4 } from '../../config.ts';
import { http } from '../../shared/index.ts';

import { ChatsApi } from './chats-api.package.ts';

export const chatsApi = new ChatsApi({
    baseUrl: `http://${IP_V4}:8002/api/chat`,
    http,
});
