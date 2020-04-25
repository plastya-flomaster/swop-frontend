import React from 'react';
import { Box, Heading, Text, Button } from 'grommet';
import { Waypoint, Configure } from 'grommet-icons';
import { useHistory } from 'react-router-dom';

const UserDetails: React.FC = () => {
    const history = useHistory();

    return (<><Box direction='row' align='center' >
        <Box pad='small'><Waypoint color='brand' /></Box>
        <Box direction='column'>
            <Heading level='4' margin={{ 'bottom': '0px' }} color='brand'>Москва</Heading>
            <Text size='small' >Автоматически</Text>
        </Box>
    </Box>
        <Box pad='small'>
            <Heading level={4}>Мои контакты</Heading>
            <Box > 
            <Button icon={<Configure />} onClick={() => {history.push('/edit')}} primary hoverIndicator />


            </Box>
        </Box></>);
}
export default UserDetails;

