import { IP_V4 } from '../../config.ts';
import { http } from '../../shared/index.ts';

import { UserApi } from './user-api.package.ts';

export const userApi = new UserApi({
    baseUrl: `http://${IP_V4}:8002/api/user`,
    http,
});
