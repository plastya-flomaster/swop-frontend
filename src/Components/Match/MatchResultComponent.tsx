import React from 'react';
import { Box, Heading, Text } from 'grommet';
import MyItem from '../Items/MyItemComponent';
import { ICategory, IMatchPair } from '../../utils/interface';

interface IMatchResultProps {
  categories: ICategory[];
  pair: IMatchPair;
}
const MatchResult: React.FC<IMatchResultProps> = ({ categories, pair }) => {
  const myItems = pair.myItems;
  const otherItems = pair.otherItems;

  return (
    <Box pad="small">
      <Heading level={3}>
        Пользователю{' '}
        <Text size="xlarge" color="brand">
          {pair.userInfo.name}
        </Text>{' '}
        понравились ваши предметы одежды:
      </Heading>
      <Box flex="grow" direction="row" wrap={true}>
        {otherItems.length > 0 &&
          otherItems.map((item, index) => (
            <MyItem item={item} key={index} categories={categories} />
          ))}
      </Box>
      <Heading level={3}>Вот что понравилось вам:</Heading>
      <Box>
        <Box flex="grow" direction="row" wrap={true}>
          {/* здесь я не знаю, нужно либо рисовать новый компонент или переиспользовать карточки
            либо делать мод только для отображения, 
            либо просто нарисовать пустую карточку чисто для отображения,
            либо  на клик делать модальное окошко и в нем подробно инфу показать (карточка только для просмотра)*/}
          {myItems.length > 0 &&
            myItems.map((item, index) => (
              <MyItem item={item} key={index} categories={categories} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};
export default MatchResult;
