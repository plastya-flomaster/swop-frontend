export interface IUserInfo {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  instagram?: string;
}

export interface IAlert {
  show: boolean;
  variant: string;
  title: string;
}

export interface IChat {
  chatId: number;
  fromItem: string;
  toItem: string;
  userImage: string;
}

export type IItem = {
  _id?: string;
  title: string;
  category: string;
  description?: string;
  tags?: ITagType[];
  photos?: FileList[];
  userId?: string;
};

export interface ICategory {
  [x: string]: 'Одежда' | 'Обувь' | 'Аксессуары' | string;
}
export type ITagType = {
  tag: string;
};

export type IPair = {
  _id?: string;
  userId: string;
  items: IItem[];
};
