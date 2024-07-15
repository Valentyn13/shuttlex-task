import {
    createChat,
    deleteChat,
    getAllChats,
    getChat,
    login,
    register,
} from './actions.ts';
import { actions } from './slice.ts';
const allActions = {
    ...actions,
    login,
    register,
    createChat,
    deleteChat,
    getAllChats,
    getChat,
};

export { allActions as chatsActions };
export { reducer as chatReducer } from './slice.ts';
