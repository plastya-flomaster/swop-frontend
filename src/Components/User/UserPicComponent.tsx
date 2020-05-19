import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Avatar, Text } from 'grommet';
import { Camera } from 'grommet-icons';

interface IUserPicProps {
  name: string;
  url?: string;
  handleIconClick?: () => void;
  mode?: string;
}
const UserPic: React.FC<IUserPicProps> = ({
  name,
  mode,
  handleIconClick,
  url,
}) => {
  const history = useHistory();

  return (
    <Box
      direction="row"
      gap="small"
      alignContent="center"
      margin={{ vertical: '1rem' }}
      pad="small"
    >
      {mode !== 'edit' ? (
        <Avatar
          src={url}
          background="dark-2"
          onClick={() => history.push('/user')}
        />
      ) : (
        <Avatar background="neutral-2" onClick={handleIconClick}>
          <Camera />
        </Avatar>
      )}

      <Text alignSelf="center" color="neutral-2" weight="bold">
        {name ? name.toUpperCase() : '<Нет имени>'}
      </Text>
    </Box>
  );
};
export default UserPic;
