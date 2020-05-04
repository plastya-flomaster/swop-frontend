import React from 'react';
import { Box, Heading } from 'grommet';
import MyItem from '../Items/MyItemComponent';
import { IItem, ICategory } from '../../utils/interface';

interface IMatchResultProps {
  categories: ICategory[];
}
const MatchResult: React.FC<IMatchResultProps> = ({ categories }) => {
  const name = '<USER.NAME>';
  const fakeItem: IItem = {
    _id: '1234567890',
    title: 'Coat',
    photos: [],
    category: '5ead2e2eb96074e77fd74898',
  };
  return (
    <Box pad="small">
      <Heading level={3}>
        Пользователю {name} понравились ваши предметы одежды:
      </Heading>
      <Box flex="grow" direction="row" wrap={true}>
        <MyItem item={fakeItem} categories={categories} />
        <MyItem item={fakeItem} categories={categories} />
      </Box>
      <Heading level={3}>Вот что понравилось вам:</Heading>
      <Box>
        <Box flex="grow" direction="row" wrap={true}>
          {/* здесь я не знаю, нужно либо рисовать новый компонент или переиспользовать карточки
            либо делать мод только для отображения, 
            либо просто нарисовать пустую карточку чисто для отображения,
            либо  на клик делать модальное окошко и в нем подробно инфу показать (карточка только для просмотра)*/}
          <MyItem item={fakeItem} categories={categories} />
        </Box>
      </Box>
    </Box>
  );
};
export default MatchResult;
