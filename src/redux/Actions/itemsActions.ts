import { AppActionType } from './ActionTypes';
import { IItem } from '../../utils/interface';
import { Dispatch } from 'react';
import axios from 'axios';

export enum ItemsActions {
    GET_ITEMS = 'GET_ITEMS',
    DEL_ITEM = 'DEL_ITEM',
    ADD_ITEM = 'ADD_ITEM',
    UPDATE_ITEM = 'UPDATE_ITEM',

    ITEM_LOADING = 'ITEM_LOADING',
    ITEM_ERROR = 'ITEM_ERROR'

}

// внести товары в стор
//вставляет данные в стор
export const sendItems = (payload: IItem[]): AppActionType => ({
    type: ItemsActions.GET_ITEMS,
    payload
});

//оповещает стор, что объекты загружаются
export const sendLoading = (): AppActionType => ({
    type: ItemsActions.ITEM_LOADING
});

//отправляет ошибки в стор
export const sendErrors = (payload: any): AppActionType => ({
    type: ItemsActions.ITEM_ERROR,
    payload
});

//отправляет в стор новый добавляемый товар?
export const addItem = (payload: IItem): AppActionType => ({
    type: ItemsActions.ADD_ITEM,
    payload
});

//обновляет товар
export const updateItem = (payload: IItem): AppActionType => ({
    type: ItemsActions.UPDATE_ITEM,
    payload
});

//удаляет товар
export const deleteItem = (payload: string): AppActionType => ({
    type: ItemsActions.DEL_ITEM,
    payload
})


export const getAllItems = (userId: string) => {
    return (dispatch: Dispatch<AppActionType>) => {
        dispatch(sendLoading());
        return axios
        .get(`http://localhost:5000/api/items/${userId}`)
        .then(res => dispatch(sendItems(res.data)))
        .catch(error => dispatch(sendErrors(error.response.data)))
    }
}