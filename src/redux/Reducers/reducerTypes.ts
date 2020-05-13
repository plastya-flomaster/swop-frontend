import { IItem, IUserInfo, ICategory, IMatchPair } from '../../utils/interface';

export interface IItemsReducer {
  loading: boolean;
  items: IItem[];
  error: any;
}
export interface IUserReducer {
  isAuthenticated: boolean;
  loading: boolean;
  user: IUserInfo;
  error?: any;
}
export interface ICategoriesReducer {
  loading: boolean;
  categories: ICategory[];
  error: any;
}
export interface ILikedItemsReducer {
  loading: boolean;
  pairs: IMatchPair[];
  error: any;
}
