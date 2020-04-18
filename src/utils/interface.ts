export interface IUserInfo {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
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

export interface IItem {
    status: 'isNew' | 'isEditing' | undefined;
}