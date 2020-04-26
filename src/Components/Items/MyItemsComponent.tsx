import React from 'react';
import AddItemComponent from './AddItemComponent';
import MyItemComponent from './MyItemComponent';

import { Box } from 'grommet';
import { IItem } from '../../utils/interface';

interface IMyItems {
    onEditMode: () => void,
    items: IItem[]
}

const MyItems: React.FC<IMyItems> = ({ onEditMode, items }) => (
    <Box margin='2rem' flex='grow' direction='row' wrap={true}>
        <AddItemComponent onEditMode={onEditMode} />
        {
            items && items
                .map((item, key) =>
                    (<MyItemComponent onEditMode={onEditMode} key={key} item={item} />
                    ))
        }
    </Box>);

export default MyItems;
