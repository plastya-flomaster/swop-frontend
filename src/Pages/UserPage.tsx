import * as React from 'react';
import { useState, useEffect } from 'react';

import { Grid, Box, Heading, Tabs, Tab, Button, Header } from 'grommet';

import { connect } from 'react-redux';

import UserPic from '../Components/User/UserPicComponent';
import UserDetails from '../Components/User/UserDetailsComponent';
import MyItems from '../Components/Items/MyItemsComponent';
import ItemCard from '../Components/Items/ItemCardComponent';
import { IItem, IUserInfo } from '../utils/interface';
import { ThunkDispatch } from 'redux-thunk';
import { AppActionType } from '../redux/Actions/ActionTypes';
import { bindActionCreators } from 'redux';
import { getAllMine } from '../redux/Actions/itemsActions';
import { AppState } from '../redux/Stores/store';
import { LinkPrevious, Configure, Alert } from 'grommet-icons';
import { Link, useHistory } from 'react-router-dom';

interface IUserPage {
    user: IUserInfo
    items: IItem[];
    id: string;
    getAllMine: (userId: string) => void;
    error: any
}

const UserPage: React.FC<IUserPage> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const history = useHistory();
    const onEditMode = () => setEditMode(true);
    const offEditMode = () => setEditMode(false);

    useEffect(() => {
        if (props.user._id)
            props.getAllMine(props.user._id);
        
    }, [props.user]);

    const handleEdit = () => {
        history.push('/edit');
    }
    return <Grid
        columns={['1/4', '3/4']}
        rows={['large']}
        areas={[
            { name: 'nav', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [1, 0], end: [1, 0] }
        ]}
        gap='xxsmall'>
        <Box gridArea='nav' background='light-3' direction='column' margin={{ 'horizontal': '1rem' }}>
            <UserPic name={props.user.name} />
            {
                (props.user.phone && props.user.instagram) ? <UserDetails phone={props.user.phone} instagram={props.user.instagram} />
                    : <><Alert color='status-warning'/><Heading level='4'>У вас не добавлены контактные данные!</Heading><Button label='Добавить' onClick={handleEdit}></Button></>

            }
            <Button icon={<Configure />} label='настройки профиля' margin='medium' onClick={handleEdit} primary hoverIndicator />

        </Box>

        <Box gridArea='main' align='start'>
            {editMode ? (<>
                <Header margin={{ 'top': '1rem' }}>
                    <Button icon={<LinkPrevious color='brand' />} onClick={offEditMode} label='Назад' margin='small' hoverIndicator />
                </Header>
                <ItemCard offEditMode={offEditMode} /></>
            ) : (<>
                <Header margin={{ 'top': '1rem' }}>
                    <Link to='/swop'><Button icon={<LinkPrevious color='brand' />} label='На главную' margin='small' hoverIndicator /></Link>
                </Header>
                <Tabs>
                    <Tab title='Мои товары'>
                        <Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>Мои товары</Heading>
                        <Heading level={5} color='status-error' margin={{ 'left': '2rem' }}>{props.error}</Heading>
                        <MyItems onEditMode={onEditMode} items={props.items} />
                    </Tab>
                    <Tab title='История обмена'>
                        <Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>История обмена</Heading>
                    </Tab>
                </Tabs></>)}
        </Box>
    </Grid>;
}
const mapStateToProps = (state: AppState) => ({
    user: state.auth.user,
    items: state.items.items,
    error: state.items.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActionType>) => ({
    getAllMine: bindActionCreators(getAllMine, dispatch)   // dispatch(getAllItems())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage); 