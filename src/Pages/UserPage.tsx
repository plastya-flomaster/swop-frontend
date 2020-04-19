import * as React from 'react';
import { useState, useEffect } from 'react';

import { Grid, Box, Heading, Tabs, Tab } from 'grommet';

import { connect } from 'react-redux';

import UserPic from '../Components/User/UserPicComponent';
import UserDetails from '../Components/User/UserDetailsComponent';
import MyItems from '../Items/MyItemsComponent';
import ItemCard from '../Items/ItemCardComponent';
import { IItem } from '../utils/interface';
import { ThunkDispatch } from 'redux-thunk';
import { AppActionType } from '../redux/Actions/ActionTypes';
import { bindActionCreators } from 'redux';
import { getAllItems } from '../redux/Actions/itemsActions';
import { AppState } from '../redux/Stores/store';

interface IUserPage {
    user: {
        name: string,
        id: string
    }
    items: IItem[];
    getAllItems: (userId: string) => void;
}

const UserPage: React.FC<IUserPage> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => setEditMode(false)

    useEffect(() => {
        props.getAllItems(props.user.id)
    }, [])

    console.log(props.items);
    

    return <>
        <Grid
            columns={['1/4', 'flex']}
            rows={['large']}
            areas={[
                { name: 'nav', start: [0, 0], end: [0, 0] },
                { name: 'main', start: [1, 0], end: [1, 0] }
            ]}
            gap='xxsmall'>
            <Box gridArea='nav' background='light-3' direction='column' margin={{ 'horizontal': '1rem' }}>
                <UserPic name={props.user.name} />
                <UserDetails />
            </Box>
            {editMode ? (
                <Box gridArea='main' align='start' >
                    <ItemCard />
                    <button onClick={offEditMode} >exit</button>
                </Box>
            ) : (
                    <Box gridArea='main' align='start'>
                        <Tabs>
                            <Tab title='Мои товары'>
                                <MyItems onEditMode={onEditMode} items={props.items} />
                            </Tab>
                            <Tab title='История обмена'>
                                <Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>История обмена</Heading>
                            </Tab>
                        </Tabs>
                    </Box>)}
        </Grid>
    </>;
}
const mapStateToProps = (state: AppState) => ({
    user: state.auth.user,
    items: state.items.items
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActionType>) => ({
  getAllItems: bindActionCreators(getAllItems, dispatch)   // dispatch(getAllItems())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage); 