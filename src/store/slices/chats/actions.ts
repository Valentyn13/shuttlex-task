import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    AsyncThunkConfig,
    Chat,
    ChatWithoutMessagesList,
    SliceName,
    User,
    UserWithoutPassword,
} from '../../../shared/index.ts';

const login = createAsyncThunk<
    User,
    { name: string; password: string },
    AsyncThunkConfig
>(`${SliceName.CHATS}/login`, async (data, { extra, rejectWithValue }) => {
    try {
        const { userApi } = extra;
        const user = await userApi.login(data);

        return user;
    } catch (error) {
        console.log(error);
        return rejectWithValue(`Error, ${JSON.stringify(error)}`);
    }
});

const register = createAsyncThunk<
    User,
    { name: string; password: string },
    AsyncThunkConfig
>(`${SliceName.CHATS}/register`, async (data, { extra, rejectWithValue }) => {
    try {
        const { userApi } = extra;
        const user = await userApi.register(data);

        return user;
    } catch (error) {
        console.log(error);
        return rejectWithValue(`Error, ${JSON.stringify(error)}`);
    }
});

const getAllChats = createAsyncThunk<
    ChatWithoutMessagesList,
    void,
    AsyncThunkConfig
>(`${SliceName.CHATS}/get-chats`, async (_, { extra, rejectWithValue }) => {
    try {
        const { chatsApi } = extra;
        const chats = await chatsApi.getAllChats();
        return chats;
    } catch (error) {
        console.log(error);
        return rejectWithValue(`Error, ${JSON.stringify(error)}`);
    }
});

const getChat = createAsyncThunk<Chat, string, AsyncThunkConfig>(
    `${SliceName.CHATS}/get`,
    async (id, { extra, rejectWithValue }) => {
        try {
            const { chatsApi } = extra;
            const chats = await chatsApi.getChat(id);
            return chats;
        } catch (error) {
            console.log(error);
            return rejectWithValue(`Error, ${JSON.stringify(error)}`);
        }
    },
);

const createChat = createAsyncThunk<
    Chat,
    { name: string; user: UserWithoutPassword },
    AsyncThunkConfig
>(`${SliceName.CHATS}/create`, async (data, { extra, rejectWithValue }) => {
    try {
        const { chatsApi } = extra;
        await chatsApi.createChat();
        return {
            _id: new Date().toISOString(),
            name: data.name,
            ownerName: data.user.name,
            ownerId: data.user.id,
            members: [data.user],
            messages: [],
        };
    } catch (error) {
        return rejectWithValue(`Error, ${JSON.stringify(error)}`);
    }
});

const deleteChat = createAsyncThunk<string, string, AsyncThunkConfig>(
    `${SliceName.CHATS}/delete`,
    async (id, { extra, rejectWithValue }) => {
        try {
            const { chatsApi } = extra;
            await chatsApi.deleteChat();
            return id;
        } catch (error) {
            return rejectWithValue(`Error, ${JSON.stringify(error)}`);
        }
    },
);

export { createChat, deleteChat, getAllChats, getChat, login, register };
