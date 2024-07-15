import { HTTP, HttpApi } from '@shared/api';
import { ApiEndpoints, ContentType, User } from '@shared/index';

type Constructor = {
    baseUrl: string;
    http: HTTP;
};

export class UserApi extends HttpApi {
    constructor({ baseUrl, http }: Constructor) {
        super({ baseUrl, http });
    }

    public async login(user: { name: string; password: string }) {
        const response = await this.load(
            this.getFullEndpoint(ApiEndpoints.LOGIN),
            {
                method: 'POST',
                payload: JSON.stringify(user),
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );
        return await response.json<User>();
    }

    public async register(user: { name: string; password: string }) {
        const response = await this.load(
            this.getFullEndpoint(ApiEndpoints.REGISTER),
            {
                method: 'POST',
                payload: JSON.stringify(user),
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );
        return await response.json<User>();
    }
}
