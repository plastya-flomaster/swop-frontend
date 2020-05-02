import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { logoutUser } from '../redux/Actions/userActions';

import { Swipeable, direction } from 'react-deck-swiper';

//import Messages from '../Components/Messages/MessagesComponent';
import SwipeCards from '../Components/Cards/SwipeCardsComponent';
import UserPic from '../Components/User/UserPicComponent';
import CardButtons from '../Components/Cards/CardButtons';

import { Grid, Box, Heading, Anchor, Text, Button } from 'grommet';

import { IItem, IAlert } from '../utils/interface';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AppState } from '../redux/Stores/store';
import { IUserReducer } from '../redux/Reducers/reducerTypes';

interface ISwap {
  logoutUser: () => any;
  auth: IUserReducer;
}

const MainPage: React.FC<ISwap> = (props) => {
  const history = useHistory();
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    variant: 'status-ok',
    title: '',
  });

  const { user } = props.auth;

  const [allItems, setAllItems] = useState<IItem[]>([]);

  useEffect(() => {
    axios
      .get<IItem[]>(`http://localhost:5000/api/items/swap/${user._id}`)
      .then((res) => setAllItems([...res.data, ...allItems]))
      .catch((err) => console.log(err));
  }, []);

  const handleSwipe = (swipeDirection: direction) => {
    if (swipeDirection == direction.RIGHT) {
      setAlert({
        show: true,
        variant: 'status-ok',
        title: 'Вы свайпнули вправо!',
      });
      axios
        .put(`http://localhost:5000/api/likeditems/addpairs/${user._id}`, {
          otherId: allItems[0].userId,
          itemId: allItems[0]._id,
        })
        .then((res) => {
          setAllItems(allItems.slice(1));
        })
        .catch((err) => console.log(err));
    }
    if (swipeDirection == direction.LEFT) {
      setAlert({
        show: true,
        variant: 'status-error',
        title: 'Вы свайпнули влево!',
      });
      axios
        .put(`http://localhost:5000/api/likeditems/dislike/${user._id}`, {
          itemId: allItems[0]._id,
        })
        .then((res) => {
          setAllItems(allItems.slice(1));
        })
        .catch((err) => console.log(err));
    }
  };
  const handleHelp = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    history.push('/help');
  };
  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    props.logoutUser();
  };

  return (
    <Grid
      columns={['1/4', '3/4']}
      rows={['xsmall', 'auto']}
      areas={[
        { name: 'nav', start: [0, 0], end: [0, 1] },
        { name: 'header', start: [1, 0], end: [1, 0] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
      gap="xxsmall"
    >
      <Box gridArea="nav" background="light-3">
        <UserPic name={user.name} />
        <Box pad="small">
          <Heading level="5">
            Добро пожаловать в приложение SWOP! Свайпай карточки справа, выбирай
            те предметы одежды, которые понравятся тебе.
          </Heading>
        </Box>
        <Button margin="small" label="узнать совпадения"></Button>
      </Box>
      <Box
        gridArea="header"
        background="light-3"
        direction="row"
        align="center"
        gap="xsmall"
        justify="end"
      >
        <Anchor
          label="Помощь"
          margin={{ right: '1rem' }}
          onClick={handleHelp}
        />
        <Anchor
          label="Выйти"
          margin={{ right: '4rem' }}
          onClick={handleLogout}
        />
      </Box>
      <Box gridArea="main">
        {allItems.length !== 0 ? (
          <>
            <Swipeable
              onSwipe={handleSwipe}
              renderButtons={({ left, right }) => {
                return <CardButtons right={right} left={left} />;
              }}
            >
              <Box align="center" pad={{ vertical: '2rem' }}>
                <SwipeCards card={allItems[0]}></SwipeCards>
              </Box>
            </Swipeable>
            {alert.show ? (
              <Box round={true} background={alert.variant}>
                <Text margin={{ horizontal: 'small' }}>{alert.title}</Text>{' '}
              </Box>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Box align="center" justify="center">
            <Heading level={2}>На сегодня всё!</Heading>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(MainPage);
