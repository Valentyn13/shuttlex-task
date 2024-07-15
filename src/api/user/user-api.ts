import { http } from '../../shared/index.ts';

import { UserApi } from './user-api.package.ts';

export const userApi = new UserApi({
    baseUrl: 'http://192.168.0.139:8002/api/user',
    http,
});
