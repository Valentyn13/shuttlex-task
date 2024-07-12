import { http } from '../../shared/index.ts';

import { ChatsApi } from './chats-api.package.ts';

export const chatsApi = new ChatsApi({
    baseUrl: 'https://63551ed3-c94e-4f03-a83a-b4ad63543149.mock.pstmn.io',
    http,
});
