import { Message } from './message.type';
import { UserWithoutPassword } from './user.type';

export type Chat = {
    id: number;
    name: string;
    owner: UserWithoutPassword;
    members: UserWithoutPassword[];
    messages: Message[];
};

export type ChatWithoutMessages = Omit<Chat, 'messages'>;

export type ChatWithoutMessagesList = ChatWithoutMessages[];
