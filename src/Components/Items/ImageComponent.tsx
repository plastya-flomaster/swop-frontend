import React from 'react';
import { Image, Close } from 'grommet-icons';
import { Box, Heading, Button } from 'grommet';

interface IUploadImageHolderProps {
    id?: number,
    onRemove?: (index?: number) => void,
    onClick?: () => void,
    imgSrc?: String
}
const UploadImageHolder: React.FC<IUploadImageHolderProps> = ({ onClick, imgSrc, id, onRemove }) => (
    <Box background={imgSrc ? `url(${imgSrc})` : 'light-3'} margin='small' height='small' width='small' elevation='small' onClick={onClick}>
        <Box border={{ color: 'brand', size: 'medium', style: 'dotted' }} basis='small' align='center' justify='center' margin='5px'>
            {onRemove ?
            <Box justify='start'>
                <Button icon={<Close />} onClick={() => onRemove(id)} alignSelf='end' /></Box> : <></>}
            <Image color='brand' />

            <Heading level={6} color='brand' margin='small'>{imgSrc ? 'Загружено' : 'Добавить фото'}</Heading>
        </Box>
    </Box>
)

export default UploadImageHolder;