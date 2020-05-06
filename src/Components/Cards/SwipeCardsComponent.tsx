import * as React from 'react';
import { IItem, ICategory } from '../../utils/interface';
import { Box, Text, Heading } from 'grommet';
import { connect } from 'react-redux';
import { AppState } from '../../redux/Stores/store';

interface Props {
  card: IItem;
  categories: ICategory[];
}

const SwipeCards: React.FC<Props> = ({ card, categories }) => (
  <Box
    round="small"
    background={
      card.photos && card?.photos?.length > 0
        ? {
            image: `url(${card?.photos[0]})`,
            opacity: 'medium',
          }
        : 'brand'
    }
    width="medium"
    height="500px"
    animation="slideUp"
    pad="small"
    justify="end"
  >
    <Text
      color={{
        dark: 'dark-2',
        light: 'light-1',
      }}
    >
      {categories[card.category]}
    </Text>
    <Box>
      <Heading
        level={3}
        color={{
          dark: 'dark-2',
          light: 'light-1',
        }}
        margin={{ bottom: '0' }}
      >
        {card.title.toUpperCase()}
      </Heading>
      <Text margin={{ vertical: '1rem' }}>{card.description}</Text>
      <Box align="start" justify="end">
        <Box
          round={true}
          background={`accent-${Math.floor(Math.random() * 4) + 1}`}
        >
          <Text margin={{ horizontal: 'small' }}>
            {card.tags ? card.tags[0]?.tag : ''}
          </Text>
        </Box>
      </Box>
    </Box>
  </Box>
);

const mapStateToProps = (state: AppState) => ({
  categories: state.categories.categories,
});
export default connect(mapStateToProps)(SwipeCards);
