import React from 'react';
import { Box, Heading } from 'grommet';

interface IItemProps {
    onEditMode: () => void
}

const MyItemComponent: React.FC<IItemProps> = ({onEditMode}) => {
    return (
        <Box background='accent-3' margin='small' height='small' width='small' elevation='small' >
            <Box border={{ color: 'brand', size: 'medium', style: 'dotted' }} basis='small' align='center' justify='center' margin='5px' onClick={onEditMode}>
                <Heading level={6} color='brand'>Мой</Heading>
            </Box>
        </Box>
    )

}
export default MyItemComponent;
