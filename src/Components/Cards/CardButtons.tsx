import * as React from 'react';
import { Button } from "react-bootstrap";

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
    return (
        <div>
            <Button onClick={left}>свайп влево</Button>
            <Button onClick={right}>свайп вправо </Button>
        </div>);
}

export default CardButtons;