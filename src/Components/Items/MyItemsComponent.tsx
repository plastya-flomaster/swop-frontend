import React from 'react';
import AddItem from './AddItemComponent';
import MyItem from './MyItemComponent';
import { Box, Tabs, Tab, Heading } from 'grommet';


import { IItem } from '../../utils/interface';

interface IMyItems {
    items: IItem[],
    error: any
}

const MyItems: React.FC<IMyItems> = ({ items, error }) => (
    <Tabs>
        <Tab title='Мои товары'>
            <Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>Мои товары</Heading>
            <Heading level={5} color='status-error' margin={{ 'left': '2rem' }}>{error}</Heading>

            <Box margin='2rem' flex='grow' direction='row' wrap={true}>
                <AddItem/>
                {
                    items && items
                        .map((item, index) =>
                            (<MyItem key={index} item={item} />
                            ))
                }
            </Box>
        </Tab>
        <Tab title='История обмена'>
            <Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>История обмена</Heading>
        </Tab>
    </Tabs>);

export default MyItems;
