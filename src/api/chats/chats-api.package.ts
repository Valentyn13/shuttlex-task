import {
    ApiEndpoints,
    Chat,
    ChatWithoutMessagesList,
    ContentType,
    HTTP,
    HttpApi,
    User,
} from '../../shared';

type Constructor = {
    baseUrl: string;
    http: HTTP;
};

export class ChatsApi extends HttpApi {
    constructor({ baseUrl, http }: Constructor) {
        super({ baseUrl, http });
    }

    public async auth() {
        const response = await this.load(
            this.getFullEndpoint(ApiEndpoints.AUTH),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );
        return await response.json<User>();
    }

    public async getAllChats() {
        const response = await this.load(
            this.getFullEndpoint(ApiEndpoints.CHATS),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );
        return await response.json<ChatWithoutMessagesList>();
    }

    public async getChat() {
        const response = await this.load(
            this.getFullEndpoint(ApiEndpoints.CHAT),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );
        return await response.json<Chat>();
    }

    public async createChat() {
        const response = await this.load(
            this.getFullEndpoint(ApiEndpoints.CHAT),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<{ status: number }>();
    }

    public async deleteChat() {
        const response = await this.load(
            this.getFullEndpoint(ApiEndpoints.CHAT),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<{ status: number }>();
    }
}
