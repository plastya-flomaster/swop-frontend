import * as React from 'react';

import { Grid, Box, Heading, Text } from 'grommet';
import { Waypoint } from 'grommet-icons';

import UserInfo from '../Components/User/UserInfoComponent';
import ItemComponent from '../Components/ItemComponent';

const UserPage: React.FC = () => {
    return <>
        <Grid
            columns={['1/4', 'flex']}
            rows={['xsmall', 'medium']}
            areas={[
                { name: 'nav', start: [0, 0], end: [0, 1] },
                { name: 'header', start: [1, 0], end: [1, 0] },
                { name: 'main', start: [1, 1], end: [1, 1] }
            ]}
            gap='xxsmall'>
            <Box gridArea='nav' background='light-3' direction='column' margin={{ 'horizontal': '1rem' }}>
                <UserInfo name={'c'} />
                <Box direction='row' align='center' >
                    <Box pad='small'><Waypoint color='brand' /></Box>
                    <Box direction='column'>
                        <Heading level='4' margin={{ 'bottom': '0px' }} color='brand'>Москва</Heading>
                        <Text size='small' >Автоматически</Text>
                    </Box>
                </Box>
                <Box pad='small'>
                    <Heading level={4} >Мои контакты</Heading>
                </Box>
            </Box>



            <Box gridArea='header' background='brand' direction='row' gap='small' align='center'>
                <Text margin={{ 'left': '2rem' }}>Мои товары</Text>
                <Text>История обмена</Text>
            </Box>

            <Box gridArea='main' background='accent-1'>
                <Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>Мои товары</Heading>
                <Box margin='2rem' wrap={true}  >
                    <ItemComponent />
                    <ItemComponent />
                    <ItemComponent />

                    <ItemComponent />
                    <ItemComponent />

                </Box>
            </Box>
        </Grid>
    </>;
}
export default UserPage; 