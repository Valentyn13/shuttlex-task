import { MessageAction } from '@shared/constants/enums/message-action.enum';

export const generateSystemMessage = (
    userName: string,
    action: MessageAction,
) => {
    let message = `${userName} `;

    switch (action) {
        case MessageAction.CREATE_CHAT:
            message += 'created the chat';
            break;
        case MessageAction.LEAVE_CHAT:
            message += 'has left the chat';
            break;
        case MessageAction.JOIN_CHAT:
            message += 'joined the chat';
            break;
        default:
            break;
    }

    const data = {
        id: new Date().toISOString(),
        user: {
            id: '7777',
            name: 'system',
        },
        message,
    };
    return data;
};

export const addChatActionMessage = (
    userName: string,
    chatId: string,
    action: MessageAction,
) => {
    let message = `${userName} `;

    switch (action) {
        case MessageAction.CREATE_CHAT:
            message += 'created the chat';
            break;
        case MessageAction.LEAVE_CHAT:
            message += 'has left the chat';
            break;
        case MessageAction.JOIN_CHAT:
            message += 'joined the chat';
            break;
        default:
            break;
    }
    return {
        message,
        user: {
            id: '7777',
            name: 'system',
        },
        chatID: chatId,
    };
};
