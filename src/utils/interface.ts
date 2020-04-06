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