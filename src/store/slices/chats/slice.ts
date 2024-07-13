import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import {
    Chat,
    ChatWithoutMessagesList,
    SliceName,
    SliceState,
    UserWithoutPassword,
} from '../../../shared';

import { auth, createChat, deleteChat, getAllChats, getChat } from './actions';

type State = {
    user: UserWithoutPassword | null;
    chats: ChatWithoutMessagesList;
    currentChat: Chat | null;
    state: SliceState;
};

const initialState: State = {
    user: null,
    chats: [],
    currentChat: null,
    state: SliceState.IDLE,
};

const { reducer, actions } = createSlice({
    initialState,
    name: SliceName.CHATS,
    reducers: {
        addMessage: (
            state,
            action: PayloadAction<{
                message: string;
                user: UserWithoutPassword;
            }>,
        ) => {
            const newMessage = {
                id: new Date().valueOf(),
                user: action.payload.user,
                message: action.payload.message,
            };

            state.currentChat?.messages.push(newMessage);
        },
    },
    extraReducers(buider) {
        buider.addCase(auth.fulfilled, (state, action) => {
            state.user = action.payload;
            state.state = SliceState.SUCCESS;
        });
        buider.addCase(getAllChats.fulfilled, (state, action) => {
            state.chats = action.payload;
            state.state = SliceState.SUCCESS;
        });
        buider.addCase(getChat.fulfilled, (state, action) => {
            state.currentChat = action.payload;
            console.log('success');
            state.state = SliceState.SUCCESS;
        });
        buider.addCase(deleteChat.fulfilled, (state, action) => {
            state.chats = state.chats.filter(
                (chat) => chat.id !== action.payload,
            );
            state.state = SliceState.SUCCESS;
        });
        buider.addCase(createChat.fulfilled, (state, action) => {
            state.chats = [...state.chats, action.payload];
            state.state = SliceState.SUCCESS;
        });
        buider.addMatcher(
            isAnyOf(
                auth.pending,
                getAllChats.pending,
                getChat.pending,
                deleteChat.pending,
                createChat.pending,
            ),
            (state) => {
                state.state = SliceState.LOADING;
            },
        );
        buider.addMatcher(
            isAnyOf(
                auth.rejected,
                getAllChats.rejected,
                getChat.rejected,
                deleteChat.rejected,
                createChat.rejected,
            ),
            (state, action) => {
                console.log(action.payload);
                state.state = SliceState.ERROR;
            },
        );
    },
});

export { actions, reducer };
