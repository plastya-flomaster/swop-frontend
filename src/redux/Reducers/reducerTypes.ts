import { IItem } from '../../utils/interface';

export interface IItemsReducer {
    loading: boolean,
    items: IItem[],
    error: any
}