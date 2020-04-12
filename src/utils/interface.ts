export interface IUserInfo {
    login: string;
    password: string;
    rememberMe?: boolean;
}
export interface ICard {
    id: number;
    title: string;
    date: string;
    location: string;
}
export interface IChat {
    chatId: number;
    fromItem: string;
    toItem: string;
    userImage: string;
}
export interface IAlert {
    show: boolean;
    variant: 'success' | 'danger' | 'light' | 'dark' | 'primary' | 'secondary' | 'warning' | 'info' | undefined;
    title: string;
}