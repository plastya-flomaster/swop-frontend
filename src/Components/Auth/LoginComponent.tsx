import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormField, Grommet, grommet, Button, Box, Heading, Form, TextInput, Text, CheckBox } from 'grommet';


const Login: React.FC = () => {

    const [validated, setValidated] = useState<boolean>(false); //валидация формы
    const [checked, setCheck] = useState<boolean>(false);
    const [user, setUser] = useState<any>({
        email: '',
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
            email: user.email,
            password: user.password
        })
        writeToLocalStorage();
        history.push('/swop');
    };

    const writeToLocalStorage = () => {
        localStorage.setItem('rememberMe', checked.toString());
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userPassword', user.password);
    }

    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        if (rememberMe) {
            setUser({
                email: localStorage.getItem('userEmail') || '',
                password: localStorage.getItem('userPassword') || ''
            })
        } else {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
        }
        console.log(validated);
    }, [])


    return (
        <Grommet theme={grommet}>
            <Box align='center'>
                <Heading level={2} margin={{'vertical': '30px'}}>Войдите, чтобы продолжить</Heading>
                <Form
                    onSubmit={handleSubmit}
                    onChange={(value: any) => { setUser(value) }}
                    value={user}>
                    <FormField label='Email' name='email' required>
                        <TextInput placeholder='test@gmail.com' name='email' />
                    </FormField>
                    <FormField label='Пароль' name='password' required>
                        <TextInput placeholder='123456' type='password' name='password' />
                    </FormField>
                    <Box direction='row' gap='small' margin={{
                        "vertical": "20px"
                    }}>
                    <Text>Нет аккаунта? <Link to='/register'><Text color='accent-2'> Зарегистрируйтесь</Text></Link></Text>
                    </Box>
                    {/* <Link to='/'><Text>Забыли пароль?</Text></Link> */}
                    <CheckBox
                        label='Запомнить меня'
                        checked={checked}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCheck(event.target.checked);
                        }} />
                    <Button type='submit' primary label='Войти' fill='horizontal' margin={{
                        "vertical": "20px"
                    }} />

                </Form>
            </Box>
        </Grommet>
    );
}
export default Login; 