import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Avatar, Text } from 'grommet';
//import { UserFemale } from 'grommet-icons'

interface IUserPicProps {
    name: any
}
const UserPic: React.FC<IUserPicProps> = ({name}) => {
    const history = useHistory();
    return (<Box direction='row' gap='small' alignContent='center' margin={{ 'vertical': '1rem' }} pad='small'>
            <Avatar src='//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80' onClick={() => history.push('/user')} />
            <Text alignSelf='center' color='neutral-2' weight='bold'>{name ? name.toUpperCase(): '<Нет имени>'}</Text>
            {/* <Avatar background='accent-2'>
                <UserFemale color='accent-1' />
            </Avatar> */}
        </Box>
    );
}
export default UserPic; 