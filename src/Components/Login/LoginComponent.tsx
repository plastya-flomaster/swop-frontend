import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IUserInfo } from "../../utils/interface";

interface Props {
    user: IUserInfo;
}
const Login: React.FC<Props> = ({ user }) => {

    const [validated, setValidated] = useState<boolean>(false); //валидация формы
    const [checked, setChecked] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        rememberMe();


    };

    const rememberMe = () => {
        setChecked(!checked);
        if (checked){
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('userLogin', user.login);
            localStorage.setItem('userPassword', user.password);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('userLogin');
            localStorage.removeItem('userPassword');
        }
    }
   
    return (
        <Container fluid='md'>
            <Form validated={validated} onSubmit={handleSubmit}>
                <h3>Войдите, чтобы продолжить...</h3>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Введите email" defaultValue={user.login} required />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" defaultValue={user.password} placeholder="Введите пароль..." required />
                </Form.Group>
                <Form.Group controlId='forgotPassword?'>
                    <Link to='/swop'>Забыли пароль?</Link>

                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Запомнить меня" defaultChecked={checked}/>
                    <Form.Control.Feedback type='valid'>Хорошо!</Form.Control.Feedback>
                </Form.Group>
                <Button type='submit' block>Войти</Button>
            </Form>
        </Container>
    );
}
export default Login; 