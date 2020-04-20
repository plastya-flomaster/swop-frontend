import React, { useState } from 'react';
import { Heading, Box, RadioButtonGroup, TextInput, TextArea, Button } from 'grommet';
import TagTextInput from './TagsInputComponent';
import { connect } from 'react-redux';

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
    return (<>
        <Heading level={2} margin={{ 'top': '2rem', 'left': '1rem' }}>Новый предмет одежды</Heading>
        <Box pad='1rem' width='large' fill={false}>
            <Heading level={5} margin={{ 'bottom': '1rem' }}>Выберите категорию</Heading>
            <Box pad={{ 'bottom': '6rem' }}>
                <RadioButtonGroup
                    name='category'
                    options={options}
                    value={category}
                    onChange={handleChange}
                ></RadioButtonGroup>
            </Box>

            <Heading level={5} margin={{ 'vertical': '1rem' }}>Название предмета одежды</Heading>
            <TextInput
                placeholder="Новый шарф H&M"
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <Heading level={5} margin={{ 'vertical': '1rem' }}>Описание</Heading>
            <TextArea
                placeholder="Введите описание, которое может помочь при выборе предмета одежды..."
                value={description}
                size='medium'
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(event.target.value) }}
            />
            <Heading level={5} margin={{ 'vertical': '1rem' }}>Теги</Heading>
            <TagTextInput selectedTags={tags} setSelectedTags={(tags: []) => setTags(tags)} />
            <Heading level={5} margin={{ 'bottom': '1rem' }}>Загрузите фотографии</Heading>
            <Box background='brand' height='small' width='small' pad='small'></Box>
            <Box background='brand' height='small' width='small'></Box>

            <Button label='Добавить' onClick={handleAdd}></Button>

        </Box>
    </>);
}

export default connect()(ItemCard);
