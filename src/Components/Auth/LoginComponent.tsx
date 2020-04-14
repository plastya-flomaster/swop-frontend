import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IUserInfo } from "../../utils/interface";


const Login: React.FC = () => {

    const [validated, setValidated] = useState<boolean>(false); //валидация формы
    const [checked, setCheck] = useState<boolean>(false);
    const [user, setUser] = useState<IUserInfo>({
        login: '',
        password: '',
    });

    const history = useHistory();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        setValidated(true);
        setUser({
            login: user.login,
            password: user.password
        })
        writeToLocalStorage();
    };
    
    const writeToLocalStorage = () => {
        localStorage.setItem('rememberMe', checked.toString());
        localStorage.setItem('userLogin', user.login);
        localStorage.setItem('userPassword', user.password);
    }

    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        if (rememberMe) {
            setUser({
                login: localStorage.getItem('userLogin') || '',
                password: localStorage.getItem('userPassword') || ''
            })
        } else {
            localStorage.removeItem('userLogin');
            localStorage.removeItem('userPassword');
        }

    }, [])


    return (
        <Container fluid='md'>
            <Form validated={validated} onSubmit={handleSubmit}>
                <h3>Войдите, чтобы продолжить...</h3>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Введите email" value={user.login} required onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setUser({
                            login: event.target.value,
                            password: user.password
                        })
                    }} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" value={user.password} placeholder="Введите пароль..." required onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setUser({
                            login: user.login,
                            password: event.target.value
                        })
                    }} />
                </Form.Group>
                <Form.Group controlId='forgotPassword?'>
                    <Link to='/swop'>Забыли пароль?</Link>

                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Запомнить меня" checked={checked} onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            setCheck(event.target.checked);
                        }} />
                    <Form.Control.Feedback type='valid'>Хорошо!</Form.Control.Feedback>
                </Form.Group>
                <Button type='submit' block onClick={() => {history.push('/swop')}}>Войти</Button>
                <Link to = '/register'>Нет аккаунта? Зарегистрируйтесь</Link>
            </Form>
        </Container>
    );
}
export default Login; 