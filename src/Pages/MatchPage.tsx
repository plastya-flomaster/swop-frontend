import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../redux/Stores/store';

import { Button, Header, Heading, Box, Layer, Text } from 'grommet';
import {
  LinkPrevious,
  CoatCheck,
  Transaction,
  Phone,
  Instagram,
  Mail,
} from 'grommet-icons';

import MatchResult from '../Components/Match/MatchResultComponent';
import { ICategory, IMatchPair } from '../utils/interface';
import { searchPairs } from '../redux/Actions/likedItemsActions';

interface IMatchPageProps {
  categories: ICategory[];
  pairs: IMatchPair[];
}

const MatchPage: React.FC<IMatchPageProps> = ({ categories, pairs }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [title, setTitle] = useState<string>(
    'Поздравляем! Вы можете обменяться!'
  );

  useEffect(() => {
    console.log(pairs);

    pairs.length === 0
      ? setTitle(
          'Пока у вас нет совпадений. Продолжайте свайпать предметы одежды и добавьте еще товары!'
        )
      : setTitle('Поздравляем! Вы можете обменяться!');
  }, [pairs]);

  return (
    <Box pad="meduim">
      <Header background="light-3">
        <Link to="/swop">
          <Button
            icon={<LinkPrevious color="brand" />}
            label="На главную"
            margin="small"
            hoverIndicator
          />
        </Link>
      </Header>
      <Box margin="medium">
        <Heading level={2}>{title}</Heading>
        {pairs.length > 0 ? (
          <MatchResult categories={categories} pair={pairs[0]} />
        ) : (
          <Box flex="grow" direction="row" wrap={true}>
            <Link to="/user">
              <Button
                margin="small"
                icon={<CoatCheck color="brand" />}
                label="Добавить еще товары!"
              />
            </Link>
            <Button margin="small" label="На главную"></Button>
          </Box>
        )}
      </Box>
      <Box>
        <Button
          label="Меняться"
          icon={<Transaction color="brand" />}
          onClick={() => {
            setShow(true);
          }}
        />
        {show && (
          <Layer
            onEsc={() => setShow(false)}
            onClickOutside={() => setShow(false)}
          >
            <Box pad="medium">
              <Heading level={4} margin={{ top: '0' }}>
                Свяжитесь с {pairs[0].userInfo.name} любым удобным способом!
              </Heading>
              <Box flex="grow" direction="row">
                <Phone color="brand" />
                <Text margin={{ left: '1rem' }}>{pairs[0].userInfo.phone}</Text>
              </Box>
              <Box flex="grow" direction="row">
                <Instagram color="brand" />
                <Text margin={{ left: '1rem' }}>
                  {pairs[0].userInfo.instagram}
                </Text>
              </Box>
              <Box flex="grow" direction="row">
                <Mail color="brand" />
                <Text margin={{ left: '1rem' }}>{pairs[0].userInfo.email}</Text>
              </Box>
              <Button label="ОК!" onClick={() => setShow(false)} />
            </Box>
          </Layer>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: AppState) => ({
  userId: state.auth.user._id,
  categories: state.categories.categories,
  pairs: state.pairs.pairs,
});
export default connect(mapStateToProps, { searchPairs })(MatchPage);
