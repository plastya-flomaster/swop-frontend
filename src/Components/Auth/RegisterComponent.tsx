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

    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((data) => ({
            ...data,
            [name]: value
        }));
    };

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
                            <Form.Control value={user.name} type='text' name='name' placeholder='Иван' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={user.email} type='email' name='email' placeholder='iivanov@gmail.com' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control value={user.password} type='password' name='password' placeholder='123456' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control value={user.confirmPassword} type='password' name='confirmPassword' placeholder='123456' onChange={handleChange} />
                        </Form.Group>

                    </Form>
                </Row>
                <Button type='submit'>Зарегистрироваться</Button>
            </Col>
        </Container >
    )

}
export default RegisterComponent;

