import * as React from 'react';
import Messages from '../Components/Messages/MessagesComponent';
import { Container, Row, Col, Navbar, Nav, Alert } from 'react-bootstrap';
import SwipeCards from '../Components/Cards/SwipeCardsComponent';
import UserInfo from '../Components/User/UserInfoComponent';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ICard, IChat, IAlert } from '../utils/interface';
import { Swipeable, direction } from 'react-deck-swiper';
import './pageStyle.css';
import CardButtons from '../Components/Cards/CardButtons';

export interface RenderButtonsPayload {
    right: () => void;
    left: () => void;
}

const MainPage: React.FC = () => {
    const history = useHistory();
    const [chats, setChats] = useState<IChat[]>();
    const [alert, setAlert] = useState<IAlert>({ show: false, variant: 'success', title: '' });
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
    ])

    useEffect(() => {
const chats: IChat[] = [{
    chatId: 0,
    toItem: 'Пальто BERSHKA',
    fromItem: 'Лонгслив ZARA',
    userImage: 'https://source.unsplash.com/random/700×700/?man'
},{
    chatId: 1,
    toItem: 'Пальто BERSHKA',
    fromItem: 'Лонгслив ZARA',
    userImage: 'https://source.unsplash.com/random/700×700/?man'
},{
    chatId: 0,
    toItem: 'Пальто BERSHKA',
    fromItem: 'Лонгслив ZARA',
    userImage: 'https://source.unsplash.com/random/700×700/?man'
},{
    chatId: 0,
    toItem: 'Пальто BERSHKA',
    fromItem: 'Лонгслив ZARA',
    userImage: 'https://source.unsplash.com/random/700×700/?man'
},{
    chatId: 0,
    toItem: 'Пальто BERSHKA',
    fromItem: 'Лонгслив ZARA',
    userImage: 'https://source.unsplash.com/random/700×700/?man'
}]
        setChats(chats)
    }, []);

    const handleKeyPress = (event: any) => {
        if (event.key === 'Digit2') {
            handleSwipe(direction.RIGHT);
        }
        if (event.key === 'Digit1') {
            handleSwipe(direction.LEFT);
        }
    }
    const handleSwipe = (swipeDirection: direction) => {
        if (swipeDirection == direction.RIGHT) {
            setAlert({ show: true, variant: 'success', title: 'Вы свайпнули вправо!' })
            setTest(test.slice(1))
        }
        if (swipeDirection == direction.LEFT) {
            setAlert({ show: true, variant: 'danger', title: 'Вы свайпнули влево!' })
            setTest(test.slice(1))
        }
    }

    return (<Container>
        <Row>
            <Col lg='3' md='9'>
                <UserInfo />
                <Messages chats={chats} />
            </Col>
            <Col lg='9' md='9'>
                <Row>
                    <Navbar>
                        <Nav.Link href="#features">Помощь</Nav.Link>
                        <Nav.Link onClick={() => { history.push('/') }}>Выйти</Nav.Link>
                    </Navbar>
                </Row>

                {(test.length !== 0)
                    ? <><Row onKeyPress={handleKeyPress}>
                        <Swipeable onSwipe={handleSwipe} renderButtons={({ left, right }) => {
                            return <CardButtons right={right} left={left} />;
                        }}>
                            <SwipeCards card={test[0]}></SwipeCards>
                        </Swipeable>
                    </Row>
                        <Row><Alert show={alert.show} variant={alert.variant}>{alert.title}</Alert></Row></>
                    : <Row>На сегодня всё!</Row>}
            </Col>
        </Row>
    </Container>);
}
export default MainPage;