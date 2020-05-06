import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../redux/Stores/store';

import { Button, Header, Heading, Box } from 'grommet';
import { LinkPrevious, CoatCheck } from 'grommet-icons';

import MatchResult from '../Components/Match/MatchResultComponent';
import { ICategory, IPair } from '../utils/interface';
import { searchPairs } from '../redux/Actions/likedItemsActions';

interface IMatchPageProps {
  userId: string;
  categories: ICategory[];
  pairs: IPair[];
}

const MatchPage: React.FC<IMatchPageProps> = ({
  userId,
  categories,
  pairs,
}) => {
  const [title, setTitle] = useState<string>(
    'Поздравляем! Вы можете обменяться!'
  );

  useEffect(() => {
    searchPairs(userId);

    console.log(pairs);

    if (pairs.length === 0) {
      setTitle(
        'Пока у вас нет совпадений. Продолжайте свайпать предметы одежды и добавьте еще товары!'
      );
    }
  }, []);

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
          <MatchResult categories={categories} />
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
    </Box>
  );
};

const mapStateToProps = (state: AppState) => ({
  userId: state.auth.user._id,
  categories: state.categories.categories,
  pairs: state.pairs.pairs,
});
export default connect(mapStateToProps, { searchPairs })(MatchPage);
