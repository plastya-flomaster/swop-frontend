import React from 'react';
import { Box, Heading } from 'grommet';
import { AddCircle } from 'grommet-icons';

interface IItemProps {
    onEditMode: () => void
}

const ItemComponent: React.FC<IItemProps> = ({onEditMode}) => {
    return (
        <Box background='light-3' margin='small' height='small' width='small' elevation='small' >
            <Box border={{ color: 'brand', size: 'medium', style: 'dotted' }} basis='small' align='center' justify='center' margin='5px' onClick={onEditMode}>
                <AddCircle color='brand'></AddCircle>
                <Heading level={6} color='brand'>Добавить</Heading>
            </Box>
        </Box>
    )

}
export default ItemComponent;
