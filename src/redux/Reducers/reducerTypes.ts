import { IItem, IUserInfo, ICategory } from '../../utils/interface';

export interface IItemsReducer {
    loading: boolean,
    items: IItem[],
    error: any
}
export interface IUserReducer {
    isAuthenticated: boolean,
    loading: boolean,
    user: IUserInfo,
    error?: any
}
export interface ICategoriesReducer {
    loading: boolean,
    categories: ICategory[],
    error: any
}