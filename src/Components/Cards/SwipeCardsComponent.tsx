import * as React from 'react';
import { IItem, ICategory } from '../../utils/interface';
import { Box, Text } from 'grommet';
import { connect } from 'react-redux';
import { AppState } from '../../redux/Stores/store';
import { useEffect } from 'react';
import { getCategories } from '../../redux/Actions/CategoriesActions';

interface Props {
  card: IItem;
  categories: ICategory[];
  getCategories: () => void;
}

const SwipeCards: React.FC<Props> = ({ card, getCategories, categories }) => {
  useEffect(() => {
    getCategories();
    console.log(categories);
  }, []);

  return (
    <Box
      round="small"
      background={
        card.photos && card?.photos?.length > 0
          ? {
              image: `url(${card?.photos[0]?.url && card?.photos[0]?.url})`,
              dark: true,
              opacity: 'medium',
            }
          : 'brand'
      }
      width="medium"
      height="400px"
      animation="slideUp"
      pad="small"
      justify="end"
    >
      <Text>{categories[card.category]}, г. Пермь</Text>
      <Box>
        <h1 className="title">{card.title}</h1>
        <p className="text">{card.description}</p>
        <Box align="start" justify="end">
          <Box round={true} background="accent-2">
            <Text margin={{ horizontal: 'small' }}>
              {card.tags ? card.tags[0]?.tag : ''}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state: AppState) => ({
  categories: state.categories.categories,
});
export default connect(mapStateToProps, { getCategories })(SwipeCards);
