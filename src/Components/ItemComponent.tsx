import React from 'react';
import { Box, Heading } from 'grommet';
import { AddCircle } from 'grommet-icons';


const ItemComponent: React.FC = () => {

    return (
        <Box background='accent-2' pad='small' >
            <Box border={{ color: 'brand', size: 'medium', style: 'dotted' }} align='center' margin='5px'>
                <AddCircle></AddCircle>
                <Heading level={6}>Добавить</Heading>
            </Box>
        </Box>
    )

}
export default ItemComponent;
