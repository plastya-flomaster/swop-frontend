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
    _id?: string, 
    title: string,
    category: ICategory,
    description?: string,
    tags?: ITagType[],
    photos?: IPhoto[]
}

export interface ICategory {
    _id: string,
    category: 'Одежда' | 'Обувь' | 'Аксессуары' | string
}
export interface ITagType {
    tag: string
}
export interface IPhoto {
    url: string
}

