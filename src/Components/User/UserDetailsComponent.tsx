import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { Waypoint, Phone, Instagram, StatusInfo } from 'grommet-icons';

interface IUserDetails {
  phone: string;
  instagram: string;
}
const UserDetails: React.FC<IUserDetails> = ({ phone, instagram }) => {
  return (
    <>
      <Box direction="row" align="center">
        <Box pad="small">
          <Waypoint color="brand" />
        </Box>
        <Box direction="column">
          <Heading level="4" margin={{ vertical: '0px' }} color="brand">
            Москва
          </Heading>
          <Text size="small">Автоматически</Text>
        </Box>
      </Box>
      <Box pad="small">
        <Box direction="row" align="center">
          <Heading level={4} margin={{ bottom: 'small', right: 'small' }}>
            Мои контакты
          </Heading>
          <StatusInfo
            size="small"
            onMouseOver={() => {
              console.log('!!!');
            }}
          />
        </Box>
        <Box direction="row" align="center">
          <Box pad="small">
            <Phone color="brand" />
          </Box>
          <Box direction="column">
            <Text size="small" weight="bold">
              Номер телефона
            </Text>
            <Text color="brand">{phone}</Text>
          </Box>
        </Box>
        <Box direction="row" align="center">
          <Box pad="small">
            <Instagram color="brand" />
          </Box>
          <Box direction="column">
            <Text size="small" weight="bold">
              Instagram
            </Text>
            <Text color="brand">{instagram}</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserDetails;
