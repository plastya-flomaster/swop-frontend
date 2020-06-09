import React, { useState, useRef } from 'react';
import { Box, Heading, Text, Drop } from 'grommet';
import { Waypoint, Phone, Instagram, StatusInfo } from 'grommet-icons';

interface IUserDetails {
  phone: string;
  instagram: string;
}
const UserDetails: React.FC<IUserDetails> = ({ phone, instagram }) => {
  const [over, setOver] = useState<boolean>(false);
  const ref = useRef<HTMLHeadingElement>(null);
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
          <Heading
            level={4}
            margin={{ bottom: 'small', right: 'small' }}
            ref={ref}
          >
            Мои контакты
          </Heading>
          <StatusInfo
            size="small"
            onMouseOver={() => setOver(true)}
            onMouseOut={() => setOver(false)}
            onFocus={() => {}}
            onBlur={() => {}}
          />
          {ref.current && over && (
            <Drop align={{ left: 'right' }} target={ref.current} plain>
              <Box
                margin="xsmall"
                pad="small"
                background="dark-3"
                round={{ size: 'medium', corner: 'left' }}
              >
                tooltip contents
              </Box>
            </Drop>
          )}
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
