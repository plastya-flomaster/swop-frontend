import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import './userInfoStyles.css';

const UserInfo: React.FC = () => {
    const history = useHistory();
    return (
        <Row className='b-header'>
            <div className='b-header__circle' onClick={() => history.push('/')}>
                <img src='https://source.unsplash.com/random/900×700/?fruit' alt='аватар пользователя'></img>
            </div>
            <div className='b-user'>
                <p className='b-user__username'>USERNAME</p>
                <p className='b-user__rating'>4.5</p>
            </div>
        </Row>
    );
}
export default UserInfo; 