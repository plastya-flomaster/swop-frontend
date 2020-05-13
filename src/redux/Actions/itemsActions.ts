import { AppActionType } from './ActionTypes';
import { IItem } from '../../utils/interface';
import { Dispatch } from 'react';
import axios from 'axios';

export enum ItemsActions {
  GET_ITEMS = 'GET_ITEMS',
  DEL_ITEM = 'DEL_ITEM',
  ADD_ITEM = 'ADD_ITEM',
  UPDATE_ITEMS = 'UPDATE_ITEMS',

  ITEM_LOADING = 'ITEM_LOADING',
  ITEM_ERROR = 'ITEM_ERROR',
}

// внести товары в стор
//вставляет данные в стор
export const sendItems = (payload: IItem[]): AppActionType => ({
  type: ItemsActions.GET_ITEMS,
  payload,
});

//оповещает стор, что объекты загружаются
export const sendLoading = (): AppActionType => ({
  type: ItemsActions.ITEM_LOADING,
});

//отправляет ошибки в стор
export const sendErrors = (payload: any): AppActionType => ({
  type: ItemsActions.ITEM_ERROR,
  payload,
});

//отправляет в стор новый добавляемый товар?
export const addItem = (payload: IItem): AppActionType => ({
  type: ItemsActions.ADD_ITEM,
  payload,
});

//обновляет товар
export const updateItems = (payload: IItem[]): AppActionType => ({
  type: ItemsActions.UPDATE_ITEMS,
  payload,
});

//удаляет товар
export const deleteItem = (payload: string): AppActionType => ({
  type: ItemsActions.DEL_ITEM,
  payload,
});

//получает все товары пользователя
export const getAllMine = (userId: string) => (
  dispatch: Dispatch<AppActionType>
) => {
  dispatch(sendLoading());
  axios
    .get(`/api/items/${userId}`)
    .then((res) => dispatch(sendItems(res.data)))
    .catch((error) => dispatch(sendErrors(error.response.data)));
};

export const addNewItem = (userId: string, item: IItem, formData: any) => (
  dispatch: Dispatch<AppActionType>
) => {
  axios
    .post(`/api/items/add/${userId}`, item)
    .then((res) => {
      dispatch(sendItems(res.data));
      let itemId = '';
      if (item._id) {
        itemId = item._id;
      } else itemId = res.data[res.data.length - 1]._id;
      axios
        .post('api/items/upload-images/i', formData, {
          headers: {
            userId,
            itemId,
          },
        })
        .then((res) => {
          dispatch(sendItems(res.data));
        });
    })
    .catch((error) => dispatch(sendErrors(error.response.data)));
};

export const updateCurrentItem = (
  userId: string,
  item: IItem,
  formData: any
) => (dispatch: Dispatch<AppActionType>) => {
  axios
    .post(`/api/items/edit/${userId}`, item)
    .then((res) => {
      dispatch(sendItems(res.data));
      let itemId = '';
      if (item._id) {
        itemId = item._id;
      } else itemId = res[res.data.length - 1];
      axios
        .post('api/items/upload-images/i', formData, {
          headers: {
            userId,
            itemId,
          },
        })
        .then((res) => {
          dispatch(sendItems(res.data));
        });
    })
    .catch((error) => dispatch(sendErrors(error.response.data)));
};

export const removeItem = (userId: string, itemId: string) => (
  dispatch: Dispatch<AppActionType>
) => {
  axios
    .delete(`/api/items/delete/${userId}`, {
      data: { itemId },
    })
    .then((res) => dispatch(sendItems(res.data)))
    .catch((error) => dispatch(sendErrors(error.response.data)));
};
