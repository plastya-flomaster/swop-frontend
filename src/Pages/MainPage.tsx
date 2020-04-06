import * as React from 'react';
import Messages from '../Components/Messages/MessagesComponent';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import SwipeCards from '../Components/Cards/SwipeCardsComponent';
import UserInfo from '../Components/User/UserInfoComponent';
import { useHistory } from 'react-router-dom';
import { ICard } from '../utils/interface';

const MainPage: React.FC = () => {
    const history = useHistory();
    const test: ICard = {
        id: 1,
        title: 'Card',
        location: 'Perm krai',
        date: '22/02/22'
    }
    return (<Container>
        <Row>
            <Col lg='3' md='9'><UserInfo></UserInfo><Messages></Messages></Col>
            <Col lg='9' md='9'>
                <Row><Navbar className="justify-content-between">
                    <Nav.Link href="#features">Помощь</Nav.Link>
                    <Nav.Link onClick={() => { history.push('/') }}>Выйти</Nav.Link>
                </Navbar></Row>
                <Row><SwipeCards card={test}></SwipeCards></Row>
            </Col>
        </Row>
    </Container>);
}
export default MainPage;