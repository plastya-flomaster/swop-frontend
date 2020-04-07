import * as React from 'react';
import Messages from '../Components/Messages/MessagesComponent';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import SwipeCards from '../Components/Cards/SwipeCardsComponent';
import UserInfo from '../Components/User/UserInfoComponent';
import { useHistory } from 'react-router-dom';
import { ICard } from '../utils/interface';
import { Swipeable, direction } from 'react-deck-swiper';

const MainPage: React.FC = () => {
    const history = useHistory();
    const [test, setTest] = React.useState<ICard[]>([{
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
   
    const handleSwipe = (swipeDirection: any) => {
        if (swipeDirection == direction.RIGHT) {
            console.log("Right");
            setTest(test.slice(1))
        }
        if (swipeDirection == direction.LEFT) {
            console.log("Left")
            setTest(test.slice(1))
        }
    }
    return (<Container>
        <Row>
            <Col lg='3' md='9'><UserInfo></UserInfo><Messages></Messages></Col>
            <Col lg='9' md='9'>
                <Row><Navbar className="justify-content-between">
                    <Nav.Link href="#features">Помощь</Nav.Link>
                    <Nav.Link onClick={() => { history.push('/') }}>Выйти</Nav.Link>
                </Navbar></Row>
                <Row>
                    <Swipeable onSwipe={handleSwipe}>
                        <SwipeCards card={test[0]}></SwipeCards>
                    </Swipeable>
                </Row>
            </Col>
        </Row>
    </Container>);
}
export default MainPage;