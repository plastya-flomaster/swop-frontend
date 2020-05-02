import * as React from 'react';
import { Like, Dislike } from 'grommet-icons';
import { Button, Box } from 'grommet';
import { RenderButtonsPayload } from 'react-deck-swiper/dist/components/SwipeableWrapper';

// const handleKeyPress = (event: any) => {
//     if (event.key === 'Digit2') {
//         handleSwipe(direction.RIGHT);
//     }
//     if (event.key === 'Digit1') {
//         handleSwipe(direction.LEFT);
//     }
// }
const CardButtons: React.FC<RenderButtonsPayload> = ({ left, right }) => {
  return (
    <Box flex="grow" direction="row" alignSelf="center">
      <Button
        icon={<Like />}
        onClick={left}
        label="свайп влево"
        margin="small"
      />
      <Button
        icon={<Dislike />}
        onClick={right}
        label="свайп вправо"
        margin="small"
      />
    </Box>
  );
};

export default CardButtons;
