import React from 'react';
import { Box, Heading, Text, Button } from 'grommet';
import { Waypoint, Configure, Phone, Instagram } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../redux/Stores/store';
import { IUserInfo } from '../../utils/interface';

interface IUserDetails {
    user: IUserInfo
}
const UserDetails: React.FC<IUserDetails> = (props) => {
    const history = useHistory();

    return (<><Box direction='row' align='center' >
        <Box pad='small'><Waypoint color='brand' /></Box>
        <Box direction='column'>
            <Heading level='4' margin={{ 'bottom': '0px' }} color='brand'>Москва</Heading>
            <Text size='small' >Автоматически</Text>
        </Box>
    </Box>
        <Box pad='small'>
            <Heading level={4} margin={{'bottom': 'small'}}>Мои контакты</Heading>
            <Box direction='row' align='center'>
                <Box pad='small'><Phone color='brand' /></Box>
                <Box direction='column'>
                    <Text size='small' weight='bold'>Номер телефона</Text>
                    <Text color='brand' >{props.user.phone}</Text>
                </Box>
            </Box>
            <Box direction='row' align='center'>
                <Box pad='small'><Instagram color='brand' /></Box>
                <Box direction='column'>
                    <Text size='small' weight='bold'>Instagram</Text>
                    <Text color='brand' >{props.user.instagram}</Text>
                </Box>
            </Box>
            <Button icon={<Configure />} onClick={() => { history.push('/edit') }} primary hoverIndicator />
        </Box></>);
}
const mapStateToProps = (state: AppState) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(UserDetails);

