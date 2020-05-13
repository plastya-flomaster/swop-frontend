import * as React from 'react';
import { useEffect } from 'react';

import { Grid, Box, Text, Button, Header } from 'grommet';

import { connect } from 'react-redux';

import UserPic from '../Components/User/UserPicComponent';
import UserDetails from '../Components/User/UserDetailsComponent';
import { IItem, IUserInfo } from '../utils/interface';
import { ThunkDispatch } from 'redux-thunk';
import { AppActionType } from '../redux/Actions/ActionTypes';
import { bindActionCreators } from 'redux';
import { getAllMine } from '../redux/Actions/itemsActions';
import { AppState } from '../redux/Stores/store';
import { LinkPrevious, Configure, Alert } from 'grommet-icons';
import { useHistory, Link } from 'react-router-dom';
import ItemRouter from '../Components/Items/ItemRouter';

interface IUserPage {
  user: IUserInfo;
  items: IItem[];
  id: string;
  getAllMine: (userId: string) => void;
  error: any;
}

const UserPage: React.FC<IUserPage> = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.user._id) props.getAllMine(props.user._id);
  }, [props.user]);

  return (
    <Grid
      columns={['1/4', '3/4']}
      rows={['large']}
      areas={[
        { name: 'nav', start: [0, 0], end: [0, 0] },
        { name: 'main', start: [1, 0], end: [1, 0] },
      ]}
      gap="xxsmall"
    >
      <Box
        gridArea="nav"
        background="light-3"
        direction="column"
        margin={{ horizontal: '1rem' }}
      >
        <UserPic name={props.user.name} url={props.user.avatar} />
        {props.user.phone && props.user.instagram ? (
          <UserDetails
            phone={props.user.phone}
            instagram={props.user.instagram}
          />
        ) : (
          <Box>
            <Box direction="row" flex="grow" align="center" pad="small">
              <Alert color="status-warning" />
              <Text margin={{ left: '1rem' }}>
                У вас не добавлены контактные данные!
              </Text>
            </Box>
            <Button
              label="Добавить"
              color="accent-4"
              onClick={() => history.push('/edit')}
              margin="medium"
              primary
              hoverIndicator
            ></Button>
          </Box>
        )}
        <Button
          icon={<Configure />}
          label="настройки профиля"
          margin="medium"
          onClick={() => history.push('/edit')}
          primary
          hoverIndicator
        />
      </Box>

      <Box gridArea="main" align="start">
        <Header margin={{ top: '1rem' }}>
          <Link to="/swop">
            <Button
              icon={<LinkPrevious color="brand" />}
              label="На главную"
              margin="small"
              hoverIndicator
            />
          </Link>
        </Header>
        <ItemRouter items={props.items} error={props.error} />
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  items: state.items.items,
  error: state.items.error,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionType>
) => ({
  getAllMine: bindActionCreators(getAllMine, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
