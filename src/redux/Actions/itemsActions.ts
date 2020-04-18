import axios from 'axios';

//добавляет товар
export const addItem = (userData: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    axios.post('http://localhost:5000/api/items', userData)
        .then(res => {

        }).catch(err => console.log(err + '!!!!')//dispatch({        })
        );
};

//читает все товары
export const readItems = (userId: string) => (res: any) => {
    axios.get(`http://localhost:5000/api/items/${userId}`).then(
        res => {
            console.log(res);
            return res;
        }).catch(err => console.log(err + '!!!!')
        );

}
//удаляет товар

//обновляет товар
