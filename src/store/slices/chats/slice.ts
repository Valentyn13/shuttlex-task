import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import {
    Chat,
    ChatWithoutMessagesList,
    SliceName,
    SliceState,
    UserWithoutPassword,
} from '../../../shared';

import { ChatWithoutMessages } from './../../../shared/constants/types/chat.type';
import {
    createChat,
    deleteChat,
    getAllChats,
    getChat,
    login,
    register,
} from './actions';

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

        joinToChat: (state, action: PayloadAction<UserWithoutPassword>) => {
            state.currentChat?.members.push(action.payload);
        },

        addChat: (state, action: PayloadAction<ChatWithoutMessages>) => {
            state.chats = [...state.chats, action.payload];
        },
        deleteChat: (state, action: PayloadAction<string>) => {
            state.chats = state.chats.filter(
                (chat) => chat._id !== action.payload,
            );
        },

        decreaseMember: (
            state,
            action: PayloadAction<{ chatId: string; userId: string }>,
        ) => {
            state.chats = state.chats.map((chat) => {
                if (chat._id === action.payload.chatId) {
                    const newMembers = chat.members.filter(
                        (member) => member.id === action.payload.userId,
                    );
                    return {
                        ...chat,
                        members: newMembers,
                    };
                }
                return chat;
            });
        },
    },
    extraReducers(buider) {
        buider.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.state = SliceState.SUCCESS;
        });
        buider.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload;
            state.state = SliceState.SUCCESS;
        });
        buider.addCase(getAllChats.fulfilled, (state, action) => {
            state.chats = action.payload;
            state.state = SliceState.SUCCESS;
        });
        buider.addCase(getChat.fulfilled, (state, action) => {
            state.currentChat = action.payload;
            state.state = SliceState.SUCCESS;
        });
        buider.addCase(deleteChat.fulfilled, (state, action) => {
            state.chats = state.chats.filter(
                (chat) => chat._id !== action.payload,
            );
            state.state = SliceState.SUCCESS;
        });
        buider.addCase(createChat.fulfilled, (state, action) => {
            state.chats = [...state.chats, action.payload];
            state.state = SliceState.SUCCESS;
        });
        buider.addMatcher(
            isAnyOf(
                login.pending,
                register.pending,
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
                login.rejected,
                register.rejected,
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
