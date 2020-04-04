import * as React from 'react';
import { useHistory } from "react-router-dom";

const Messages: React.FC = () => {
    const history = useHistory();
    return (<><h1>Сообщения</h1><button onClick={() => history.push('/')}>Back</button></>);
}
export default Messages; 