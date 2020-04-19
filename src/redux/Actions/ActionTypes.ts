import { SET_CURRENT_USER, USER_LOADING, GET_ERRORS } from "./types";
import { ItemsActions } from './itemsActions';
import { IItem } from '../../utils/interface';


interface ISetCurrentUser {
    type: typeof SET_CURRENT_USER,
    payload: any
}

interface ISetUserLoading {
    type: typeof USER_LOADING
}

interface ISendErrors {
    type: typeof GET_ERRORS,
    payload: any
}
type UserTypes = ISetCurrentUser | ISetUserLoading | ISendErrors;

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



export type AppActionType = UserTypes | ItemTypes;

