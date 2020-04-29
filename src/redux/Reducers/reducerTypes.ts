import { IItem, IUserInfo } from '../../utils/interface';

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