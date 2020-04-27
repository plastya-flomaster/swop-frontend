import React, { useState } from 'react';
import { Heading, Box, RadioButtonGroup, TextInput, Button, TextArea } from 'grommet';
import TagTextInput from './TagsInputComponent';
import { connect } from 'react-redux';
import UploadImageHolder from './ImageComponent';
import { IItem, ICategory } from '../../utils/interface';
import { AppState } from '../../redux/Stores/store';
import { addNewItem } from '../../redux/Actions/itemsActions'
interface IItemCardProps {
    id: string,
    error: any,
    addNewItem: (userId: string, item: IItem) => void
}

const ItemCard: React.FC<IItemCardProps> = (props) => {

    //категория -- это name нужной категории
    const [category, setCategory] = useState({ id: '5e9ec7131c9d44000068b413', name: 'Одежда' });
    const [title, settitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState(['start tags']);

    // {
    //     "disabled": false,
    //     "id": "ONE",
    //     "name": "one",
    //     "value": "1",
    //     "label": "one"
    //   }
    const options = [{
        name: 'Одежда',
        value: '5e9ec7131c9d44000068b413',
        label: 'Одежда'
    },
    {
        name: 'Обувь',
        value: '5e9ec72a1c9d44000068b414',
        label: 'Обувь'
    },
    {
        name: 'Аксессуары',
        value: '5e9ec7411c9d44000068b415',
        label: 'Аксессуары'
    }];

    // const [createMode, setCreateMode] = useState();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({
            id: event.target.value,
            name: event.target.name
        });
    };

    const handleAdd = (event: any) => {
        event.preventDefault();
        const cat: ICategory = {
            _id: category.id,
            category: category.name
        }
        const item: IItem = {
            title: title,
            category: cat,
            description: description,
            //tags: tags

        };
        props.addNewItem(props.id, item);

    };
    const handlePhotoAdd = (event: any) => {
        console.log(event);

    }
    return (<Box flex='grow' direction='column' border pad='small'>
        <Heading level={2} margin={{ 'bottom': '0' }}>Новый предмет одежды</Heading>
        <Heading level={5} margin={{ 'vertical': '1rem' }}>Что вы хотите обменять?</Heading>
        <TextInput
            placeholder="Новый шарф H&M"
            value={title}
            onChange={event => settitle(event.target.value)}
        />
        <Heading level={5} margin={{ 'bottom': '1rem' }}>Выберите категорию</Heading>

        <RadioButtonGroup
            name='rbg'
            options={options}
            value={category}
            onChange={handleChange}
        />

        <Heading level={5} margin={{ 'vertical': '1rem' }}>Описание</Heading>
        <Box align="center" margin={{ 'bottom': '0px' }}>
            <TextArea
                fill
                placeholder="Введите описание, которое может помочь при выборе предмета одежды..."
                value={description}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(event.target.value) }}
            />
        </Box>
        <Box>
            <Heading level={5} margin={{ 'vertical': '1rem' }}>Теги (до 10 штук)</Heading>
            <TagTextInput selectedTags={tags} setSelectedTags={(tags: []) => setTags(tags)} />
        </Box>
        <Heading level={5} margin={{ 'bottom': '1rem' }}>Загрузите фотографии</Heading>
        <UploadImageHolder />
        <input type='file' onChange={handlePhotoAdd}></input>
        <Button label='Добавить' onClick={handleAdd}></Button>
    </Box>)
};
const mapStateToProps = (state: AppState) => ({
    id: state.auth.id,
    error: state.items.error
});

export default connect(mapStateToProps, { addNewItem })(ItemCard);
