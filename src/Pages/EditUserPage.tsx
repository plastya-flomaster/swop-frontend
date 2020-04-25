import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Box, Button, Header, TextInput, FormField, Heading, Grommet, grommet, Form, Layer } from 'grommet';
import { LinkPrevious, MailOption, Phone, Instagram } from 'grommet-icons';

import UserPic from '../Components/User/UserPicComponent';
import { Link } from 'react-router-dom';
import { IUserInfo } from '../utils/interface';
import { updateUser, deleteUser } from "../redux/Actions/userActions";
import { AppState } from '../redux/Stores/store';

interface IEditUserPage {

    updateUser: (id: string, userData: IUserInfo) => void;
    deleteUser: (id: string) => void,
    error: any,
    user: IUserInfo,
    id: string
}

const EditUserPage: React.FC<IEditUserPage> = (props) => {

    const [confirm, setConfirm] = useState(false);

    const [user, setUser] = useState<IUserInfo>(props.user);

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
        setUser({
            name: user.name,
            email: user.email,
            phone: user.phone,
            instagram: user.instagram

        });
        props.updateUser(props.id, user);
        event.preventDefault();
    };
    const handleDelete = () => {
        setConfirm(false);
        props.deleteUser(props.id);
    };
    const handleReset = () => {
        setUser({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            instagram: ''
        });
    };

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    return (<Grommet theme={grommet}>
        <Box pad='small' fill align='center' justify='center'>
            <Header>
                <UserPic name={user.name}></UserPic>
                <Link to='/swop'><Button icon={<LinkPrevious color='brand' />} label='На главную' margin='small' hoverIndicator /></Link>
            </Header>
            <Form
                onSubmit={handleEdit}
                onReset={handleReset}
                value={user}
                onChange={(nextValue: any) => setUser(nextValue)}
            >
                <FormField label='Имя' name='name' validate={{ regexp: /^[a-zA-zА-Яа-яё]/i }}>
                    <TextInput placeholder='Иван' name='name' />
                </FormField>
                <FormField label='Email' disabled={true} name='email' help='поле Email нельзя отредактировать'>
                    <TextInput icon={<MailOption />} placeholder='ivan@ivan.iv' name='email' disabled={true} />
                </FormField>
                <Heading level='4' margin={{ 'top': '3rem' }} >Контактные данные</Heading>
                <Heading level='6' >Эти данные будут показаны человеку, с которым вы запланируете обмен</Heading>

                <FormField label='Телефон' name='phone'>
                    <TextInput icon={<Phone />} placeholder='+799912312312' name='phone' />
                </FormField>
                <FormField label='Instagram'>
                    <TextInput icon={<Instagram />} placeholder='Иван' name='instagram' />
                </FormField>
                <Box margin='small' flex='grow' direction='row' justify='between'>
                    <Button label='Изменить' type='submit' color='status-ok' />
                    <Button label='Очистить' type='reset' />
                </Box>

            </Form>
            <Button label='Удалить аккаунт' color='status-error' onClick={() => setConfirm(true)} />
            {confirm && (
                <Layer
                    onEsc={() => setConfirm(false)}
                    onClickOutside={() => setConfirm(false)}
                >
                    <Box pad='small'>

                        <Heading level='4'>Вы уверены, что хотите удалить аккаунт?</Heading>
                        <Box margin='small' flex='grow' direction='row' justify='between'>

                            <Button label="Удалить" color='status-error' onClick={handleDelete} />
                            <Button label="Отмена" color='status-unknown' onClick={() => setConfirm(false)} />
                        </Box>
                    </Box>
                </Layer>
            )}
        </Box></Grommet>);
}
const mapStateToProps = (state: AppState) => ({
    user: state.auth.user,
    id: state.auth.id,
    error: state.items.error
});

export default connect(
    mapStateToProps,
    {
        updateUser,
        deleteUser
    }
)(EditUserPage);