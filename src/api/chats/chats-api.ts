import { http } from '../../shared/index.ts';

import { ChatsApi } from './chats-api.package.ts';

export const chatsApi = new ChatsApi({
    baseUrl: 'http://192.168.0.139:8002/api/chat',
    http,
});
