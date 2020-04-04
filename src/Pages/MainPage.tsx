import * as React from 'react';
import Messages from '../Components/Messages/MessagesComponent';
import { Container, Row, Col } from 'react-bootstrap';
import SwipeCards from '../Components/Cards/SwipeCardsComponent';

const MainPage: React.FC = () => {
    return (<Container>
        <Row>
            <Col lg='3' md='9'><Messages></Messages></Col>
            <Col lg='9' md='9'><SwipeCards></SwipeCards></Col>
        </Row>  
        </Container>);
}
export default MainPage;