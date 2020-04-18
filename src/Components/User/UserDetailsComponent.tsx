import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { Waypoint } from 'grommet-icons';

const UserDetails: React.FC = () => {
    return (<><Box direction='row' align='center' >
        <Box pad='small'><Waypoint color='brand' /></Box>
        <Box direction='column'>
            <Heading level='4' margin={{ 'bottom': '0px' }} color='brand'>Москва</Heading>
            <Text size='small' >Автоматически</Text>
        </Box>
    </Box>
        <Box pad='small'>
            <Heading level={4}>Мои контакты</Heading>
        </Box></>);
}
export default UserDetails;

