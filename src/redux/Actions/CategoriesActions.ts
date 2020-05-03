import { AppActionType } from './ActionTypes';
import { Dispatch } from 'react';
import { ICategory } from '../../utils/interface';
import axios from 'axios';

export enum CategoriesActions {
  GET_CATEGORIES = 'GET_CATEGORIES',

  CATEGORIES_LOADING = 'CATEGORIES_LOADING',
  CATEGORIES_ERROR = 'CATEGORIES_ERROR',
}

export const sendCategories = (payload: ICategory[]): AppActionType => ({
  type: CategoriesActions.GET_CATEGORIES,
  payload,
});

export const sendLoading = (): AppActionType => ({
  type: CategoriesActions.CATEGORIES_LOADING,
});

export const sendErrors = (payload: any): AppActionType => ({
  type: CategoriesActions.CATEGORIES_ERROR,
  payload,
});

//получаем список категорий
export const getCategories = () => (dispatch: Dispatch<AppActionType>) => {
  dispatch(sendLoading());
  axios
    .get('/api/categories')
    .then((res) => dispatch(sendCategories(res.data)))
    .catch((err) => dispatch(sendErrors(err.response.data)));
};
