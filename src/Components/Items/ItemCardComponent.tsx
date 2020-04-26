import React, { useState } from 'react';
import { Heading, Box, RadioButtonGroup, TextInput, Button, TextArea } from 'grommet';
import TagTextInput from './TagsInputComponent';
import { connect } from 'react-redux';
import UploadImageHolder from './ImageComponent';

// interface ICategory {
//     category: 'Одежда' | 'Обувь' | 'Аксессуары';
// }

// function instanceOfCategory(object: any): object is ICategory {
//     return true;
// }

const ItemCard: React.FC = (props) => {

    const [category, setCategory] = useState('Одежда');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState(['start tags']);

    const options = ['Одежда', 'Обувь', 'Аксессуары'];

   // const [createMode, setCreateMode] = useState();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const obj = event.target.value;
        // if (instanceOfCategory(obj)) {
        setCategory(obj);
        // }
    };

    const handleAdd = (event: any) => {
        event.preventDefault();
        console.log('Тип товара', category);
        console.log('Наименование товара', name);
        console.log('Описание товара', description);
        console.log('Теги товара:');
        console.log(tags);

        // props.dispatch({
        //     type: 'ADD_ITEM',
        //     payload: tags
        // });



    }
    return (<Box flex='grow' direction='column' border pad='small'>
        <Heading level={2} margin={{ 'bottom': '0' }}>Новый предмет одежды</Heading>
        <Heading level={5} margin={{ 'vertical': '1rem' }}>Что вы хотите обменять?</Heading>
        <TextInput
            placeholder="Новый шарф H&M"
            value={name}
            onChange={event => setName(event.target.value)}
        />
        <Heading level={5} margin={{ 'bottom': '1rem' }}>Выберите категорию</Heading>

        <RadioButtonGroup
            name='category'
            options={options}
            value={category}
            onChange={handleChange}
        ></RadioButtonGroup>

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
        <Button label='Добавить' onClick={handleAdd}></Button>
    </Box>)
};

export default connect()(ItemCard);
