import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../redux/Stores/store';

import { Button, Header, Heading, Box } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

import MatchResult from '../Components/Match/MatchResultComponent';
import { ICategory } from '../utils/interface';
import { searchPairs } from '../redux/Actions/likedItemsActions';

interface IMatchPageProps {
  userId: string;
  categories: ICategory[];
}

const MatchPage: React.FC<IMatchPageProps> = ({ userId, categories }) => {
  useEffect(() => {
    searchPairs(userId);
  }, []);

  return (
    <>
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
      <Box pad="medium">
        <Heading level={2}>Поздравляем! Вы можете обменяться!</Heading>
        <MatchResult categories={categories} />
        <Button label="Связаться"></Button>
      </Box>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  userId: state.auth.user._id,
  categories: state.categories.categories,
  pairs: state.pairs.pairs,
});
export default connect(mapStateToProps, { searchPairs })(MatchPage);
