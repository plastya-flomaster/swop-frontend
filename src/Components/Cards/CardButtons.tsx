import * as React from 'react';
import { Like, Dislike } from 'grommet-icons';
import { Button, Box } from 'grommet';
export interface CardButtonsProps {
    left: () => void;
    right: () => void;
}
// const handleKeyPress = (event: any) => {
//     if (event.key === 'Digit2') {
//         handleSwipe(direction.RIGHT);
//     }
//     if (event.key === 'Digit1') {
//         handleSwipe(direction.LEFT);
//     }
// }
const CardButtons: React.FC<CardButtonsProps> = ({ left, right }) => {
    return (<Box flex='grow' direction='row' margin='small'>
        <Button icon={<Like />} onClick={left} label='свайп влево' />
        <Button icon={<Dislike />} onClick={right} label='свайп вправо' />
    </Box>);
}

export default CardButtons;