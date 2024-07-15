import {
    ApiEndpoints,
    Chat,
    ChatWithoutMessagesList,
    ContentType,
    HTTP,
    HttpApi,
} from '../../shared';

type Constructor = {
    baseUrl: string;
    http: HTTP;
};

export class ChatsApi extends HttpApi {
    constructor({ baseUrl, http }: Constructor) {
        super({ baseUrl, http });
    }

    public async getAllChats() {
        const response = await this.load(
            this.getFullEndpoint(ApiEndpoints.ROOT),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );
        return await response.json<ChatWithoutMessagesList>();
    }

    public async getChat(id: string) {
        const response = await this.load(this.getFullEndpoint(`/${id}`), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: false,
        });
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
