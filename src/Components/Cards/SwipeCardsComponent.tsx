import * as React from 'react';
import { IItem } from '../../utils/interface';
import { Box, Text } from 'grommet';

interface Props {
    card: IItem
}

const SwipeCards: React.FC<Props> = ({ card }) => {
    return (
        <Box round='small'
            background={card.photos ?
                { 'image': `url(${card.photos![0].url})`, 'dark': true, 'opacity': 'medium' }
                : 'brand'}
            width='medium'
            height='400px'
            animation='slideUp'
            pad='small'
            justify='end'>
                <Text>{card.category.category}, г. Пермь</Text>
            <Box>
                <h1 className='title'>{card.name}</h1>
                <p className='text'>{card.description}</p>
                <Box align='start' justify='end'>
                    <Box round={true} background='accent-2'>
                        <Text margin={{ 'horizontal': 'small' }}>
                             {card.type ? card.type[0].typeName : ''}
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>);
}

export default SwipeCards;