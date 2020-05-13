import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Avatar, Text, Layer, Button } from 'grommet';
import { Camera, Close } from 'grommet-icons';
import { useRef } from 'react';

interface IUserPicProps {
  name: string;
  url?: string;
  handleAddAvatar?: (event: any) => void;
  mode?: string;
}
const UserPic: React.FC<IUserPicProps> = ({
  name,
  mode,
  handleAddAvatar,
  url,
}) => {
  const history = useHistory();
  const [show, setShow] = React.useState<boolean>(false);
  const uploadAvatar = useRef<HTMLInputElement>(null);

  const handlePhotoEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShow(true);
  };

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
        <Avatar background="neutral-2" onClick={handlePhotoEdit}>
          <Camera />
        </Avatar>
      )}

      <Text alignSelf="center" color="neutral-2" weight="bold">
        {name ? name.toUpperCase() : '<Нет имени>'}
      </Text>

      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Box alignSelf="end">
            <Close onClick={() => setShow(false)} />
          </Box>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(event: any) => {
              handleAddAvatar && handleAddAvatar(event);
              setShow(false);
            }}
            ref={uploadAvatar}
            name="user-avatar"
            accept="image/png, image/jpeg"
          />
          <Button
            label="Загрузить"
            onClick={() => uploadAvatar.current?.click()}
          ></Button>
        </Layer>
      )}
    </Box>
  );
};
export default UserPic;
