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
    name: string,
    category: ICategory,
    description?: string,
    type?: IItemType[],
    photos?: IPhoto[]
}

export interface ICategory {
    id: number,
    category: 'Одежда' | 'Обувь' | 'Аксессуары'
}
export interface IItemType {
    id: number, 
    typeName: string
}
export interface IPhoto {
    url: string
}

