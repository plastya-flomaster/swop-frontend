import React from 'react';
import { Box, Heading } from 'grommet';
import { AddCircle } from 'grommet-icons';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface IItemProps {}
const AddItem: React.FC<IItemProps> = () => {
   
    const history = useHistory();
    const {url} = useRouteMatch();

    return (
        <Box background='light-3' margin='small' height='small' width='small' elevation='small' >
            <Box border={{ color: 'brand', size: 'medium', style: 'dotted' }} basis='small' align='center' justify='center' margin='5px' onClick={()=> history.push(`${url}/item/new`)}>
                <AddCircle color='brand'/>
                <Heading level={6} color='brand' margin='small'>Добавить</Heading>
            </Box>
        </Box>
    )

}
export default AddItem;
