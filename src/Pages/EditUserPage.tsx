import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Box,
  Button,
  Header,
  TextInput,
  FormField,
  Heading,
  Form,
  Layer,
} from 'grommet';
import { LinkPrevious, MailOption, Phone, Instagram } from 'grommet-icons';

import UserPic from '../Components/User/UserPicComponent';
import { Link } from 'react-router-dom';
import { IUserInfo } from '../utils/interface';
import {
  updateUser,
  deleteUser,
  logoutUser,
  uploadUserPic,
} from '../redux/Actions/userActions';
import { AppState } from '../redux/Stores/store';

interface IEditUserPage {
  updateUser: (userData: IUserInfo) => void;
  deleteUser: (id: string) => void;
  logoutUser: () => void;
  uploadUserPic: (userId: string, file: any) => void;
  error: any;
  user: IUserInfo;
  id: string;
}

const EditUserPage: React.FC<IEditUserPage> = (props) => {
  const [confirm, setConfirm] = useState(false);
  const [user, setUser] = useState<IUserInfo>(props.user);
  const [updated, setUpdated] = useState(false);
  const history = useHistory();

  const handleAddAvatar = (event: any) => {
    const formData = new FormData();
    formData.append('user-avatar', event.target.files[0]);
    props.uploadUserPic(user._id!, formData);
  };
  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUser({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      instagram: user.instagram,
    });
    props.updateUser(user);
    setUpdated(true);
  };
  const handleDelete = () => {
    setConfirm(false);
    props.deleteUser(user._id!);
    props.logoutUser();
  };
  const handleReset = () => {
    setUser({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      instagram: '',
    });
  };

  useEffect(() => {
    setUser(props.user);
    if (props.error === null && updated) {
      history.push('/user');
    } else {
      setUpdated(false);
    }
  }, [props.user]);

  return (
    <>
      <Box pad="small" fill align="center" justify="center">
        <Header>
          <UserPic
            name={user.name}
            mode={'edit'}
            handleAddAvatar={handleAddAvatar}
          ></UserPic>
          <Link to="/swop">
            <Button
              icon={<LinkPrevious color="brand" />}
              label="На главную"
              margin="small"
              hoverIndicator
            />
          </Link>
        </Header>
        <Form
          onSubmit={handleEdit}
          onReset={handleReset}
          value={user}
          onChange={(nextValue: any) => setUser(nextValue)}
          messages={{
            invalid: 'Поле Имя не может быть пустым!',
          }}
        >
          <FormField
            label="Имя"
            name="name"
            validate={{ regexp: /^[a-zA-zА-Яа-яё]/i }}
            error={props.error && props.error.name}
          >
            <TextInput placeholder="Иван" name="name" />
          </FormField>
          <FormField
            label="Email"
            disabled={true}
            name="email"
            help="поле Email нельзя отредактировать"
          >
            <TextInput
              icon={<MailOption />}
              placeholder="ivan@ivan.iv"
              name="email"
              disabled={true}
            />
          </FormField>
          <Heading level="4" margin={{ top: '3rem' }}>
            Контактные данные
          </Heading>
          <Heading level="6">
            Эти данные будут показаны человеку, с которым вы запланируете обмен
          </Heading>

          <FormField
            label="Телефон"
            name="phone"
            type="tel"
            error={props.error && props.error.phone}
          >
            <TextInput
              icon={<Phone />}
              placeholder="+799912312312"
              name="phone"
            />
          </FormField>
          <FormField
            label="Instagram"
            error={props.error && props.error.instagram}
          >
            <TextInput
              icon={<Instagram />}
              placeholder="Иван"
              name="instagram"
            />
          </FormField>
          <Box margin="small" flex="grow" direction="row" justify="between">
            <Button label="Изменить" type="submit" color="status-ok" />
            <Button label="Очистить" type="reset" />
          </Box>
        </Form>
        <Button
          label="Удалить аккаунт"
          color="status-error"
          onClick={() => setConfirm(true)}
        />
        {confirm && (
          <Layer
            onEsc={() => setConfirm(false)}
            onClickOutside={() => setConfirm(false)}
          >
            <Box pad="small">
              <Heading level="4">
                Вы уверены, что хотите удалить аккаунт?
              </Heading>
              <Box margin="small" flex="grow" direction="row" justify="between">
                <Button
                  label="Удалить"
                  color="status-error"
                  onClick={handleDelete}
                />
                <Button
                  label="Отмена"
                  color="status-unknown"
                  onClick={() => setConfirm(false)}
                />
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    </>
  );
};
const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  error: state.auth.error,
});

export default connect(mapStateToProps, {
  updateUser,
  uploadUserPic,
  deleteUser,
  logoutUser,
})(EditUserPage);
