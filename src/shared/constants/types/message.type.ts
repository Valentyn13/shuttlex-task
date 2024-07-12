import { UserWithoutPassword } from './user.type';

export type Message = {
    id: number;
    user: UserWithoutPassword;
    message: string;
};
