import React from 'react';
import { Box, Heading } from 'grommet';
import { IItem, ICategory } from '../../utils/interface';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface IItemProps {
  item: IItem;
  categories: ICategory[];
}

const MyItem: React.FC<IItemProps> = ({ item, categories }) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <Box
      background="brand"
      margin="small"
      height="small"
      width="small"
      elevation="small"
    >
      <Box
        background={
          item.photos && item.photos.length > 0
            ? {
                image: `url(${item.photos[0]})`,
                dark: true,
                opacity: 'medium',
              }
            : 'brand'
        }
        basis="small"
        align="start"
        justify="end"
        margin="5px"
        onClick={() => history.push(`${url}/item/${item._id}`)}
        pad={{ left: '1rem' }}
      >
        <Heading level={4} color="light-1" margin={{ bottom: '0' }}>
          {item.title}
        </Heading>
        {item.category ? (
          <Heading level={6} color="light-1" margin={{ vertical: 'small' }}>
            {categories[item.category]}
          </Heading>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
export default MyItem;
