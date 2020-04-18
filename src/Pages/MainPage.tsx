import * as React from 'react';
import { useState } from 'react';

import { connect } from 'react-redux';
import { logoutUser } from '../redux/Actions/authActions'

import { Swipeable, direction } from 'react-deck-swiper';

//import Messages from '../Components/Messages/MessagesComponent';
import SwipeCards from '../Components/Cards/SwipeCardsComponent';
import UserPic from '../Components/User/UserPicComponent.tsx';
import CardButtons from '../Components/Cards/CardButtons';

import { Grid, Box, Heading, Anchor } from 'grommet';

import { ICard } from '../utils/interface';


export interface RenderButtonsPayload {
    right: () => void;
    left: () => void;
}

interface ISwap {
    logoutUser: () => any,
    auth: {
        isAuthenticated: boolean,
        user: {
            id: string,
            name: string     
        }
    }
}

const MainPage: React.FC<ISwap> = (props) => {
    //const [chats, setChats] = useState<IChat[]>();
    const [alert, setAlert] = useState({ show: false, variant: 'success', title: '' });
    const [test, setTest] = useState<ICard[]>([{
        id: 1,
        title: 'Card',
        location: 'Perm krai',
        date: '22/02/22'
    },
    { id: 2, title: 'Card2', location: 'Perm krai', date: '15/02/22' },
    {
        id: 3,
        title: 'Card3',
        location: 'Perm krai',
        date: '24/02/22'
    },
    {
        id: 4,
        title: 'Card4',
        location: 'Perm krai',
        date: '25/02/22'
    },
    ]);

    const { user } = props.auth;

    // useEffect(() => {
    //     const chats: IChat[] = [{
    //         chatId: 0,
    //         toItem: 'Пальто BERSHKA',
    //         fromItem: 'Лонгслив ZARA',
    //         userImage: 'https://source.unsplash.com/random/700×700/?man'
    //     }, {
    //         chatId: 1,
    //         toItem: 'Пальто BERSHKA',
    //         fromItem: 'Лонгслив ZARA',
    //         userImage: 'https://source.unsplash.com/random/700×700/?man'
    //     }, {
    //         chatId: 0,
    //         toItem: 'Пальто BERSHKA',
    //         fromItem: 'Лонгслив ZARA',
    //         userImage: 'https://source.unsplash.com/random/700×700/?man'
    //     }, {
    //         chatId: 0,
    //         toItem: 'Пальто BERSHKA',
    //         fromItem: 'Лонгслив ZARA',
    //         userImage: 'https://source.unsplash.com/random/700×700/?man'
    //     }, {
    //         chatId: 0,
    //         toItem: 'Пальто BERSHKA',
    //         fromItem: 'Лонгслив ZARA',
    //         userImage: 'https://source.unsplash.com/random/700×700/?man'
    //     }]
    //    // setChats(chats)
    // }, []);

    const handleSwipe = (swipeDirection: direction) => {
        if (swipeDirection == direction.RIGHT) {
            setAlert({ show: true, variant: 'success', title: 'Вы свайпнули вправо!' })
            setTest(test.slice(1))
        }
        if (swipeDirection == direction.LEFT) {
            setAlert({ show: true, variant: 'danger', title: 'Вы свайпнули влево!' })
            setTest(test.slice(1))
        }
    };
    const handleLogout = (event: any) => {
        debugger;
        event.preventDefault();
        props.logoutUser();

    };

    return (<>
        <Grid
            columns={['1/4', 'flex']}
            rows={['xsmall', 'medium']}
            areas={[
                { name: 'nav', start: [0, 0], end: [0, 1] },
                { name: 'header', start: [1, 0], end: [1, 0] },
                { name: 'main', start: [1, 1], end: [1, 1] }
            ]}
            gap='xxsmall'>
            <Box gridArea='nav' background='light-3'>
                <UserPic name={user.name} />
                {/* <Messages chats={chats} /> */}
            </Box>
            <Box gridArea='header' background='light-3' direction='row' align='center' gap='xsmall' justify='end'>
                <Anchor label='Помощь'></Anchor>
                <Anchor label='Выйти' margin={{ 'right': '4rem' }} onClick={handleLogout}></Anchor>
            </Box>
            <Box gridArea='main' background='light-3'>
                {
                    (test.length !== 0)
                        ? <><Box border = {{color: 'brand'}}>
                            <Swipeable onSwipe={handleSwipe} renderButtons={({ left, right }) => {
                                return <CardButtons right={right} left={left} />;
                            }}>
                                <SwipeCards card={test[0]}></SwipeCards>
                            </Swipeable>
                        </Box>
                            {(alert.show) ? <Box>
                                <Heading>{alert.title}, {alert.variant}</Heading>
                            </Box> : <></>}
                        </>
                        : <Heading level={2}> На сегодня всё!</Heading>
                }
            </Box>
        </Grid>
    </>



    );
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(MainPage);