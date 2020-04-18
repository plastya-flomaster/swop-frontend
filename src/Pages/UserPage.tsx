import * as React from 'react';
import { useState, useEffect } from 'react';

import { Grid, Box, Heading, Tabs, Tab } from 'grommet';

import { connect } from 'react-redux';

import UserPic from '../Components/User/UserPicComponent';
import UserDetails from '../Components/User/UserDetailsComponent';
import MyItems from '../Items/MyItemsComponent';
import ItemCard from '../Items/ItemCardComponent';

import { readItems } from '../redux/Actions/itemsActions';

interface IUserPage {
    user: {
        name: string,
        id: string
    }
}

const UserPage: React.FC<IUserPage> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => setEditMode(false)

    useEffect(() => {
        alert('!');
        const res = readItems(props.user.id);
        console.log(res);
    }, [])

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
                                <MyItems onEditMode={onEditMode} />
                            </Tab>
                            <Tab title='История обмена'>
                                <Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>История обмена</Heading>
                            </Tab>
                        </Tabs>
                    </Box>)}
        </Grid>
    </>;
}
const mapStateToProps = (state: any) => ({
    user: state.auth.user,
    items: state.items
});

export default connect(
    mapStateToProps
)(UserPage); 