import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from "../../redux/Actions/authActions";
import { FormField, Grommet, grommet, Button, Box, Heading, Form, TextInput, Text, CheckBox } from 'grommet';

interface ILoginProps extends RouteComponentProps {
    loginUser: (userData: any) => void,
    auth: any,
    errors: any
}

const LoginComponent: React.FC<ILoginProps> = (props) => {

    //const [validated, setValidated] = useState<boolean>(false); //валидация формы
    const [checked, setCheck] = useState<boolean>(false);
    const [user, setUser] = useState<any>({ email: '', password: '' });
    const [err, setErrors] = useState({ err: props.errors });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        // console.log(validated);
        // console.log(err);
        // setValidated(true);
        e.preventDefault();

            setUser({
                email: user.email,
                password: user.password
            })
            props.loginUser(user);
            writeToLocalStorage();
        
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
    }, []);

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push('/swop');
        }
        if (props.errors) {
            setErrors({
                err: props.errors
            })
        }
    }, [props])


    return (
        <Grommet theme={grommet}>
            <Box align='center'>
                <Heading level={2} margin={{ 'vertical': '30px' }}>Войдите, чтобы продолжить</Heading>
                <Form
                    onSubmit={handleSubmit}
                    onChange={(value: any) => { setUser(value) }}
                    value={user}
                    validate='submit'>
                    <FormField label='Email' name='email' error={err.err.email}>
                        <TextInput placeholder='test@gmail.com' name='email' />
                    </FormField>
                    <FormField label='Пароль' name='password' error={err.err.password}>
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
};

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(LoginComponent);
