import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    AsyncThunkConfig,
    Chat,
    ChatWithoutMessagesList,
    SliceName,
    User,
    UserWithoutPassword,
} from '../../../shared/index.ts';

const getExampleData = createAsyncThunk<
    {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
    },
    void,
    AsyncThunkConfig
>(`${SliceName.EXAMPLE}/get-data`, async (_, { extra, rejectWithValue }) => {
    try {
        const { exampleApi } = extra;
        const a = await exampleApi.getPositions();

        return a;
    } catch (error) {
        return rejectWithValue(
            `Error while fetching data ${JSON.stringify(error)}`,
        );
    }
});

const auth = createAsyncThunk<
    User,
    { name: string; password: number },
    AsyncThunkConfig
>(`${SliceName.CHATS}/auth`, async (data, { extra, rejectWithValue }) => {
    try {
        const { chatsApi } = extra;
        const user = await chatsApi.auth();

        return user;
    } catch (error) {
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
        return rejectWithValue(`Error, ${JSON.stringify(error)}`);
    }
});

const getChat = createAsyncThunk<Chat, void, AsyncThunkConfig>(
    `${SliceName.CHATS}/get`,
    async (_, { extra, rejectWithValue }) => {
        try {
            const { chatsApi } = extra;
            const chats = await chatsApi.getChat();
            return chats;
        } catch (error) {
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
            id: new Date().valueOf(),
            name: data.name,
            owner: data.user,
            members: [data.user],
            messages: [],
        };
    } catch (error) {
        return rejectWithValue(`Error, ${JSON.stringify(error)}`);
    }
});

const deleteChat = createAsyncThunk<number, number, AsyncThunkConfig>(
    `${SliceName.CHATS}/create`,
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

export { auth, createChat, deleteChat, getAllChats, getChat, getExampleData };
