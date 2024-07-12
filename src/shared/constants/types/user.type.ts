export type User = {
    id: number;
    name: string;
    password: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;
