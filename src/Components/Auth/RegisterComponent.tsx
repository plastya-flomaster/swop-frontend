import * as React from 'react';
import { useState, useEffect } from 'react';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/Actions/userActions';

import { FormField, Header, Button, Box, Heading, Form, TextInput, Anchor } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

import { IError } from '../../utils/types';
import { AppState } from '../../redux/Stores/store';
import { IUserInfo } from '../../utils/interface';


interface IRegister extends RouteComponentProps {
    registerUser: (userData: any, history: any) => void,
    isAuthenticated: boolean
    errors: IError
}

const RegisterComponent: React.FC<IRegister> = (props) => {

    const [user, setUser] = useState<IUserInfo>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    useEffect(() => {
          // If logged in and user navigates to Register page, redirect him to swop
          if (props.isAuthenticated) {
            props.history.push('/swop');
          }
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        props.registerUser(user, props.history);
        event.preventDefault();

    };
    const handleReset = () => {
        setUser({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (<>
            <Header>
                <Link to='/' ><Button icon={<LinkPrevious color='brand'/>} label = 'Назад' margin='small' plain={true} hoverIndicator /></Link>
            </Header>
            <Box align='center'>
                <Heading level={2}>Зарегистрироваться</Heading>
                <Box direction='row' gap='small'>
                    <h5>Уже есть аккаунт? </h5>
                    <Link to='/login'><Anchor href=''>Войдите</Anchor></Link>
                </Box>

                <Form
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    value={user}
                    onChange={(nextValue: any) => { setUser(nextValue) }}
                >
                    <FormField label='Имя' name='name' error={props.errors && props.errors.name}>
                        <TextInput placeholder='Иван' name='name' />
                    </FormField>
                    <FormField label='Email' name='email' error={props.errors && props.errors.email} >
                        <TextInput placeholder='test@gmail.com' name='email' />
                    </FormField>
                    <FormField label='Пароль' name='password' error={props.errors && props.errors.password}>
                        <TextInput placeholder='123456' type='password' name='password' />
                    </FormField>
                    <FormField label='Повторите пароль' name='confirmPassword' error={props.errors && props.errors.confirmPassword}>
                        <TextInput placeholder='123456' type='password' name='confirmPassword' />
                    </FormField>
                    <Box direction='row' gap='medium'>
                        <Button type='submit' primary label='Зарегистрироваться' />
                        <Button type='reset' label='Очистить' />
                    </Box>
                </Form>
            </Box></>
            )};

//allows pass props auth and errors to register component
const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(RegisterComponent));

