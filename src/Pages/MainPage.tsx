import * as React from 'react';
import { useState } from 'react';

import { connect } from 'react-redux';
import { logoutUser } from '../redux/Actions/userActions'

import { Swipeable, direction } from 'react-deck-swiper';

//import Messages from '../Components/Messages/MessagesComponent';
import SwipeCards from '../Components/Cards/SwipeCardsComponent';
import UserPic from '../Components/User/UserPicComponent';
import CardButtons from '../Components/Cards/CardButtons';

import { Grid, Box, Heading, Anchor, Text, Button } from 'grommet';

import { IItem, ICategory, IItemType, IAlert } from '../utils/interface';

import { useHistory } from "react-router-dom";

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
    const history = useHistory();
    const [alert, setAlert] = useState<IAlert>({ show: false, variant: 'status-ok', title: '' });

    const category: ICategory = { id: 1, category: 'Одежда' };
    const cat2: ICategory = { id: 2, category: 'Обувь' };
    const type1: IItemType = { id: 2, typeName: 'Крутой!' }
    const [test, setTest] = useState<IItem[]>([{
        name: 'Брюки Armani',
        description: 'Новые и красивые!',
        category: category,
        photos: [{
            url: 'https://source.unsplash.com/random/700×700/?man'
        },
        { url: 'https://source.unsplash.com/random/700×700/?wear' }]

    }, {
        name: 'Карточка 2',
        description: 'Новые и красивые!',
        category: category,
        photos: [{
            url: 'https://source.unsplash.com/random/700×700/?shoes'
        },
        { url: 'https://source.unsplash.com/random/700×700/?wear' }]

    }, {
        name: 'Ботинки черные',
        description: 'Размера 41, мужские',
        category: cat2,
        type: [type1]


    }]);

    const { user } = props.auth;

    // useEffect(() => {
    //     const chats: IChat[] = [{
    //         chatId: 0,
    //         toItem: 'Пальто BERSHKA',
    //         fromItem: 'Лонгслив ZARA',
    //         userImage: ''
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
            setAlert({ show: true, variant: 'status-error', title: 'Вы свайпнули вправо!' })
            setTest(test.slice(1))
        }
        if (swipeDirection == direction.LEFT) {
            setAlert({ show: true, variant: 'status-ok', title: 'Вы свайпнули влево!' })
            setTest(test.slice(1))
        }
    };
    const handleHelp = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        history.push('/help');
    };
    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        props.logoutUser();
    };


    return (<>
        <Grid
            columns={['1/4', 'fill']}
            rows={['xsmall', 'flex']}
            areas={[
                { name: 'nav', start: [0, 0], end: [0, 1] },
                { name: 'header', start: [1, 0], end: [1, 0] },
                { name: 'main', start: [1, 1], end: [1, 1] }
            ]}
            gap='xxsmall'>
            <Box gridArea='nav' background='light-3'>
                <UserPic name={user.name} />
                {/* <Messages chats={chats} /> */}
                <Box pad='small'><Heading level='5'>Добро пожаловать в приложение SWOP!
                Свайпай карточки справа, выбирай те предметы одежды, которые понравятся тебе.</Heading>
                </Box>
                <Button label='узнать совпадения'></Button>
            </Box>
            <Box gridArea='header' background='light-3' direction='row' align='center' gap='xsmall' justify='end'>
                <Anchor label='Помощь' onClick={handleHelp}></Anchor>
                <Anchor label='Выйти' margin={{ 'right': '4rem' }} onClick={handleLogout}></Anchor>
            </Box>
            <Box gridArea='main'>
                {
                    (test.length !== 0)
                        ? <>
                            <Swipeable onSwipe={handleSwipe} renderButtons={({ left, right }) => {
                                return <CardButtons right={right} left={left} />;
                            }}>
                                <Box align='center' pad={{ 'vertical': '2rem' }}><SwipeCards card={test[0]}></SwipeCards></Box>
                            </Swipeable>
                            {(alert.show) ? <Box round={true} background={alert.variant}>
                        <Text margin={{ 'horizontal': 'small' }}>{alert.title}</Text> </Box> : <></>}
                        </>
                        : <Box align='center' justify='center'><Heading level={2}>На сегодня всё!</Heading></Box>
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