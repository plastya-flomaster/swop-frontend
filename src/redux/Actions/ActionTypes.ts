import { ItemsActions } from './itemsActions';
import { UserActions } from './userActions';
import { IItem, IUserInfo, ICategory } from '../../utils/interface';
import { CategoriesActions } from './CategoriesActions';

interface ISetCurrentUser {
  type: typeof UserActions.SET_CURRENT_USER;
  payload: IUserInfo;
}

interface ISetUserLoading {
  type: typeof UserActions.USER_LOADING;
}

interface IUserLogout {
  type: typeof UserActions.USER_LOGOUT;
}

interface ISendErrors {
  type: typeof UserActions.USER_ERROR;
  payload: any;
}

type UserTypes = ISetCurrentUser | ISetUserLoading | IUserLogout | ISendErrors;

interface IGetAllItems {
  type: typeof ItemsActions.GET_ITEMS;
  payload: IItem[];
}
interface IDelItem {
  type: typeof ItemsActions.DEL_ITEM;
  payload: string;
}

interface IAddItem {
  type: typeof ItemsActions.ADD_ITEM;
  payload: IItem;
}

interface IUpdateItems {
  type: typeof ItemsActions.UPDATE_ITEMS;
  payload: IItem[];
}

interface IItemLoading {
  type: typeof ItemsActions.ITEM_LOADING;
}

interface IItemError {
  type: typeof ItemsActions.ITEM_ERROR;
  payload: any;
}

type ItemTypes =
  | IGetAllItems
  | IDelItem
  | IAddItem
  | IUpdateItems
  | IItemLoading
  | IItemError;

interface ICategoriesLoading {
  type: typeof CategoriesActions.CATEGORIES_LOADING;
}
interface ICategoriesError {
  type: typeof CategoriesActions.CATEGORIES_ERROR;
  payload: any;
}
interface IGetAllCategories {
  type: typeof CategoriesActions.GET_CATEGORIES;
  payload: ICategory[];
}

type CategoryTypes = ICategoriesLoading | ICategoriesError | IGetAllCategories;

export type AppActionType = UserTypes | ItemTypes | CategoryTypes;
