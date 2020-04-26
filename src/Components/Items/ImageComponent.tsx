import React from 'react';
import { Image } from 'grommet-icons';
import { Box, Heading } from 'grommet';

const UploadImageHolder: React.FC = () => {
    return (
        <Box background='light-3' margin='small' height='small' width='small' elevation='small' >
        <Box border={{ color: 'brand', size: 'medium', style: 'dotted' }} basis='small' align='center' justify='center' margin='5px'>
            <Image color='brand'/>
            <Heading level={6} color='brand' margin='small'>Добавить фото</Heading>
        </Box>
    </Box>
)
}
export default UploadImageHolder;