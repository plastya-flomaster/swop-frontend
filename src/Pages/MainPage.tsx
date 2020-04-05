import * as React from 'react';
import Messages from '../Components/Messages/MessagesComponent';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import SwipeCards from '../Components/Cards/SwipeCardsComponent';
import UserInfo from '../Components/User/UserInfoComponent';
import { useHistory } from 'react-router-dom';

const MainPage: React.FC = () => {
    const history = useHistory();
    return (<Container>
        <Row>
            <Col lg='3' md='9'><UserInfo></UserInfo><Messages></Messages></Col>
            <Col lg='9' md='9'>
                <Row><Navbar className="justify-content-between">
                    <Nav.Link href="#features">Помощь</Nav.Link>
                    <Nav.Link onClick={()=> {history.push('/')}}>Выйти</Nav.Link>
                    </Navbar></Row>
                <Row><SwipeCards></SwipeCards></Row>
            </Col>
        </Row>
    </Container>);
}
export default MainPage;