import {
    auth,
    createChat,
    deleteChat,
    getAllChats,
    getChat,
} from './actions.ts';
import { actions } from './slice.ts';
const allActions = {
    ...actions,
    auth,
    createChat,
    deleteChat,
    getAllChats,
    getChat,
};

export { allActions as chatsActions };
export { reducer as chatReducer } from './slice.ts';
