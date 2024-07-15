import { Message } from './message.type';
import { UserWithoutPassword } from './user.type';

export type Chat = {
    _id: string;
    name: string;
    ownerId: string;
    ownerName: string;
    members: UserWithoutPassword[];
    messages: Message[];
};

export type ChatWithoutMessages = Omit<Chat, 'messages'>;

export type ChatWithoutMessagesList = ChatWithoutMessages[];
