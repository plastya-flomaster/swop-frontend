import { ItemsActions } from './itemsActions';
import { UserActions } from './userActions'
import { IItem, IUserInfo } from '../../utils/interface';


interface ISetCurrentUser {
    type: typeof UserActions.SET_CURRENT_USER,
    payload: IUserInfo
}

interface ISetUserLoading {
    type: typeof UserActions.USER_LOADING
}

interface IUserLogout {
    type: typeof UserActions.USER_LOGOUT
}

interface ISendErrors {
    type: typeof UserActions.USER_ERROR
    payload: any
}

type UserTypes = ISetCurrentUser | ISetUserLoading | IUserLogout | ISendErrors;

interface IGetAllItems {
    type: typeof ItemsActions.GET_ITEMS,
    payload: IItem[]
}
interface IDelItem {
    type: typeof ItemsActions.DEL_ITEM,
    payload: string
}

interface IAddItem {
    type: typeof ItemsActions.ADD_ITEM,
    payload: IItem
}

interface IUpdateItem {
    type: typeof ItemsActions.UPDATE_ITEM,
    payload: IItem
}

interface IItemLoading {
    type: typeof ItemsActions.ITEM_LOADING
}

interface IItemError {
    type: typeof ItemsActions.ITEM_ERROR,
    payload: any
}

type ItemTypes = IGetAllItems | IDelItem | IAddItem | IUpdateItem | IItemLoading | IItemError;

export type AppActionType = UserTypes | ItemTypes ;

