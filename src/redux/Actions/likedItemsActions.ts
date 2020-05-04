import axios from 'axios';
import { Dispatch } from 'react';
import { AppActionType } from './ActionTypes';
import { IPair } from '../../utils/interface';

export enum LikeditemsActions {
  LIKED_ITEMS_ERROR = 'LIKED_ITEMS_ERROR',
  LIKED_ITEMS_LOADING = 'LIKED_ITEMS_LOADING',
  LIKED_ITEMS_PAIRS = 'LIKED_ITEMS_PAIRS'
}
export const sendLoading = (): AppActionType => ({
  type: LikeditemsActions.LIKED_ITEMS_LOADING,
});
export const sendPairs = (payload: IPair[]): AppActionType => ({
  type: LikeditemsActions.LIKED_ITEMS_PAIRS,
  payload
});

export const sendErrors = (payload: any): AppActionType => ({
  type: LikeditemsActions.LIKED_ITEMS_ERROR,
  payload
});

export const searchPairs = (userId: string) => (
  dispatch: Dispatch<AppActionType>
) => {
  dispatch(sendLoading());
  axios
    .get(`/api/likeditems/search/${userId}`)
    .then((res) => { console.log(res.data) ;return dispatch(sendPairs(res.data))})
    .catch((err) => dispatch(sendErrors(err)));
};
