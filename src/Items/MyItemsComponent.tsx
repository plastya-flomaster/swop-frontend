import React from 'react';
import ItemComponent from './ItemComponent';
import MyItemComponent from '../Items/MyItemComponent';

import { Heading, Box } from 'grommet';
import { IItem } from '../utils/interface';

interface IMyItems {
    onEditMode: () => void,
    items: IItem[]
}

const MyItems: React.FC<IMyItems> = ({ onEditMode, items }) => {
    return (<><Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>Мои товары</Heading>
        <Box margin='2rem' flex='grow' direction='row' wrap={true}>
            <ItemComponent onEditMode={onEditMode} />
            {
                items&&items
                    .map((item, key) =>
                        (<MyItemComponent onEditMode={onEditMode} key={key} item={item} />
                        ))
            }
        </Box></>);
}
export default MyItems;
