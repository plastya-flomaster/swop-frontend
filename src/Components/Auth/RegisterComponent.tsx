import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const RegisterComponent: React.FC = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleSubmit = () => {

    }
    useEffect(() => {
        setUser({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }, [])
    return (
        <Container>
            <Col>
                <Row>
                    <Link to='/' >Назад</Link>
                </Row>
                <Row>
                    <h2>Зарегистрироваться</h2>
                </Row>
                <Row>                    <h6>Уже есть аккаунт?</h6> <Link to='/login'>Войти</Link>
                </Row>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control value={user.name} type='text' placeholder="Иван" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={user.email} type='email' placeholder="iivanov@gmail.com" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control value={user.password} type='password' placeholder="123456" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control value={user.confirmPassword} type='password' placeholder="123456" />
                        </Form.Group>

                    </Form>
                </Row>
                <Button type='submit'>Зарегистрироваться</Button>
            </Col>
        </Container >
    )

}
export default RegisterComponent;

