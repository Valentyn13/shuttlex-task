export type User = {
    id: number;
    name: string;
    password: number;
};

export type UserWithoutPassword = Omit<User, 'password'>;
