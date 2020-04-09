import * as React from 'react';
import {Button} from "react-bootstrap";

export interface CardButtonsProps {
    left: () => void;
    right: () => void;
}
 
const CardButtons: React.FC<CardButtonsProps> = ({left, right}) => {
    return (
    <div>
    <Button onClick={left}>свайп влево</Button>
    <Button onClick={right}>свайп впаво </Button>
    </div>);
}
 
export default CardButtons;