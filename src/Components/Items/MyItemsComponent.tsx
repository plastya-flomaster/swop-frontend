import React from 'react';
import AddItem from './AddItemComponent';
import MyItem from './MyItemComponent';
import { Box, Tabs, Tab, Heading, Text } from 'grommet';

import { IItem, ICategory } from '../../utils/interface';

interface IMyItems {
  items: IItem[];
  error: any;
  categories: ICategory[];
}

const MyItems: React.FC<IMyItems> = ({ items, error, categories }) => (
  <Tabs>
    <Tab title="Мои товары">
      <Heading level={2} margin={{ left: '2rem', vertical: '1.5rem' }}>
        Мои товары
      </Heading>
      <Heading level={5} color="status-error" margin={{ left: '2rem' }}>
        {error}
      </Heading>

      <Box margin="2rem" flex="grow" direction="row" wrap={true}>
        <AddItem />
        {items.length > 0 &&
          items.map((item, index) => (
            <MyItem key={index} item={item} categories={categories} />
          ))}
      </Box>
    </Tab>
    <Tab title="История обмена">
      <Heading level={2} margin={{ left: '2rem', vertical: '1.5rem' }}>
        История обмена
      </Heading>
      <Text>
        В будущих версиях здесь можно будет отслеживать историю обмена.
      </Text>
    </Tab>
  </Tabs>
);

export default MyItems;
