import {
    configureStore,
    type ThunkMiddleware,
    type Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';

import { chatReducer, exampleReducer } from '../slices';

import { chatsApi, exampleApi } from '@api/index.ts';
import { userApi } from '@api/user/user-api';

export type RootReducer = {
    example: ReturnType<typeof exampleReducer>;
    chats: ReturnType<typeof chatReducer>;
};

type ExtraArguments = {
    exampleApi: typeof exampleApi;
    chatsApi: typeof chatsApi;
    userApi: typeof userApi;
};

export class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            UnknownAction,
            Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
        >
    >;

    public constructor() {
        this.instance = configureStore({
            devTools: true,
            reducer: {
                example: exampleReducer,
                chats: chatReducer,
            },
            middleware: (getDefaultMiddleware) => {
                return getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                });
            },
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            exampleApi,
            chatsApi,
            userApi,
        };
    }
}
