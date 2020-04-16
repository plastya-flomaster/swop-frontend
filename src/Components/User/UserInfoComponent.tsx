import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Avatar, Text } from 'grommet';
//import { UserFemale } from 'grommet-icons'

const UserInfo: React.FC = () => {
    const history = useHistory();
    return (
        <Box direction="row" gap="small" alignContent='center' margin={{ 'vertical': '2rem' }}>
            <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" onClick={() => history.push('/user')} />
            <Text alignSelf='center' color='neutral-2' weight='bold'>USERNAME</Text>
            {/* <Avatar background="accent-2">
                <UserFemale color="accent-1" />
            </Avatar> */}
        </Box>      
    );
}
export default UserInfo; 