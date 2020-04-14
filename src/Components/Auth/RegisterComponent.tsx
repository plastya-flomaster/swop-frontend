import * as React from 'react';
import { useState, useEffect } from 'react';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/Actions/authActions';
//import classnames from 'classnames';

import { FormField, Grommet, grommet, Header, Button, Box, Heading, Form, TextInput, Anchor } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

type IError = {
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}
interface IRegisterProps extends RouteComponentProps {
    registerUser: (userData: any, history: any) => void,
    auth: {},
    errors: IError
}

const RegisterComponent: React.FC<IRegisterProps> = (props) => {

    const [err, setErrors] = useState({ err: props.errors });
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        debugger;
        if (props.errors) {
            setErrors({
                err: props.errors
            })
        }
    }, [props.errors])

    const handleSubmit = (event: any) => {
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

    return (
        <Grommet theme={grommet}>
            <Header>
                <Link to='/' ><Button icon={<LinkPrevious color='brand'/>} label = 'Назад' margin='small' plain={true} hoverIndicator /></Link>

            </Header>
            <Box align="center">
                <Heading level={2}>Зарегистрироваться</Heading>
                <Box direction='row' gap='small'>
                    <h5>Уже есть аккаунт? </h5>
                    <Link to='/login'><Anchor href="">Войдите</Anchor></Link>
                </Box>

                <Form
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    value={user}
                    onChange={(nextValue: any) => { setUser(nextValue) }}
                >
                    <FormField label="Имя" name='name' error={err.err.name}>
                        <TextInput placeholder="Иван" name='name' />
                    </FormField>
                    <FormField label="Email" name='email' error={err.err.email}>
                        <TextInput placeholder="test@gmail.com" name='email' />
                    </FormField>
                    <FormField label="Пароль" name='password' error={err.err.password}>
                        <TextInput placeholder="123456" type="password" name='password' />
                    </FormField>
                    <FormField label="Повторите пароль" name='confirmPassword' error={err.err.confirmPassword}>
                        <TextInput placeholder="123456" type="password" name='confirmPassword' />
                    </FormField>
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label="Зарегистрироваться" />
                        <Button type="reset" label="Очистить" />
                    </Box>
                </Form>
            </Box>
        </Grommet>
    )

}
//allows pass props auth and errors  to register component
const mapStateToProps = (state: any) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(RegisterComponent));

