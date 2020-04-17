import * as React from 'react';
import './CardsStyles.css';
import { ICard } from '../../utils/interface';

interface Props {
    card: ICard
}

const SwipeCards: React.FC<Props> = ({ card }) => {
    return (
        <>
        <div className='card'>
            <div className='header'>
                <span className='date'>{card.date}</span>
            </div>
            <div className='data'>
                <span className='location'>{card.location}</span>
                <h1 className='title'>{card.title}</h1>
                <p className='text'>The antsy bingers of Netflix will eagerly anticipate the digital release of the Survive soundtrack, out today.</p>
                <div className='footer'>{card.location}</div>
            </div>
        </div>
        </>);
}

export default SwipeCards;