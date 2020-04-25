import React, { useEffect } from 'react';
import { Box, Heading } from 'grommet';
import { IItem } from '../../utils/interface';

interface IItemProps {
    onEditMode: () => void;
    item: IItem;
    key: number;
}

const MyItemComponent: React.FC<IItemProps> = ({ onEditMode, item, key }) => {
    
    useEffect(() => {
        console.log(item);
    }, [])
    
    return(
        <Box background='brand' margin='small' height='small' width='small' elevation='small'>
            <Box background={ item.photos && item.photos.length > 0 ? 
            {'image': `url(${item.photos![0].url})`, 'dark': true, 'opacity' : 'medium'}
             : 'brand'} basis='small' align='start' justify='end' margin='5px' onClick={onEditMode} pad={{'left': '1rem'}}>
                <Heading level={4} color='light-1' margin={{'bottom': '0'}} truncate={true}>{item.name}</Heading>
                <Heading level={6} color='light-1'>{item.category.category}</Heading>
            </Box>
        </Box>
    )}
export default MyItemComponent;
