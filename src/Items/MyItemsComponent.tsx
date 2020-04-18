import React from 'react';
import ItemComponent from '../Components/ItemComponent';
import { Heading, Box} from 'grommet';

interface IMyItems {
    onEditMode: () => void
}
const MyItems: React.FC<IMyItems> = ({onEditMode}) => {
    return (<><Heading level={2} margin={{ 'left': '2rem', 'vertical': '1.5rem' }}>Мои товары</Heading>
        <Box margin='2rem' flex='grow' direction='row' wrap={true}>
            <ItemComponent onEditMode={onEditMode} />
        </Box></>);
}
export default MyItems;
