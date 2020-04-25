export interface IUserInfo {
    _id?: string,
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    instagram?: string;
}

export interface IAlert {
    show: boolean,
    variant: string,
    title: string
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

