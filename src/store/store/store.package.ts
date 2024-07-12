import {
    configureStore,
    type ThunkMiddleware,
    type Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';

import { exampleReducer } from '../slices';

import { chatsApi, exampleApi } from '@api/index.ts';

export type RootReducer = {
    example: ReturnType<typeof exampleReducer>;
};

type ExtraArguments = {
    exampleApi: typeof exampleApi;
    chatsApi: typeof chatsApi;
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
        };
    }
}
