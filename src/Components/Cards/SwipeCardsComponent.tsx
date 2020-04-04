import * as React from 'react';
const SwipeCards: React.FC = () => {
    return (<><div className='card'>
    <img src="https://source.unsplash.com/random" alt=""/>
    <h3 className='title'>title</h3>
    <h4 className='description'>description</h4>
    <div className='footer'>
        <div className='location'>
            <img
                src='/content/location.svg'
                alt='info'
                height='20'>
            </img>
            <h6>location</h6>
        </div>
        <img
            src='/content/info.svg'
            alt='info'
            height='20'>
        </img>
    </div>
</div></>);
}

export default SwipeCards;