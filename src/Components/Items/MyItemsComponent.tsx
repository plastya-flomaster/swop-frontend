import React from 'react';
import AddItemComponent from './AddItemComponent';
import MyItemComponent from './MyItemComponent';
import { Box, Tabs, Tab, Heading } from 'grommet';


import { IItem } from '../../utils/interface';

interface IMyItems {
    onEditMode: () => void,
    items: IItem[],
    errors: any
}

const MyItems: React.FC<IMyItems> = ({ onEditMode, items, errors }) => (
    <Tabs>
        <Tab title='Мои товары'>
            <Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>Мои товары</Heading>
            <Heading level={5} color='status-error' margin={{ 'left': '2rem' }}>{errors}</Heading>

            <Box margin='2rem' flex='grow' direction='row' wrap={true}>
                <AddItemComponent onEditMode={onEditMode} />
                {
                    items && items
                        .map((item, index) =>
                            (<MyItemComponent onEditMode={onEditMode} key={index} item={item} />
                            ))
                }
            </Box>
        </Tab>
        <Tab title='История обмена'>
            <Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>История обмена</Heading>
        </Tab>
    </Tabs>);

export default MyItems;
