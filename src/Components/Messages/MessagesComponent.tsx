import * as React from 'react';
import './MessagesStyle.css';
import { IChat } from "../../utils/interface";

interface IMessagesProps {
    chats?: IChat[]
}

const Messages: React.FC<IMessagesProps> = ({chats}) => {
    return(<>
        <h2>Сообщения</h2>
        {chats&&chats.map(chat => {
             return <div className='change'>
                <div className='circle'>
                    <img src={chat.userImage} alt="user profile"/>
                </div>
                <div className='data'>
                    <div className='head'>
                    <strong>{chat.fromItem}</strong>
                    <img
                        src='/content/arrows-change.svg'
                        alt='arrow'
                        height='15'></img>
                    <strong>{chat.toItem}</strong>
                    </div>
                </div>
            </div>
        })}
        </>)
}
export default Messages; 