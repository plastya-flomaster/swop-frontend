import React, { useState, useRef, useEffect } from 'react';
import { Heading, Box, RadioButtonGroup, TextInput, Button, TextArea, Text } from 'grommet';
import TagTextInput from './TagsInputComponent';
import { connect } from 'react-redux';
import UploadImageHolder from './ImageComponent';
import { IItem, ICategory, ITagType } from '../../utils/interface';
import { AppState } from '../../redux/Stores/store';
import { addNewItem } from '../../redux/Actions/itemsActions';
import { useParams, useHistory } from 'react-router-dom';

interface IItemCardProps {
    id: string,
    error: any,
    items: IItem[],
    loading: boolean,
    addNewItem: (userId: string, item: IItem) => void,
}

const ItemCard: React.FC<IItemCardProps> = (props) => {

    //категория -- это name нужной категории
    const [category, setCategory] = useState<ICategory>({ _id: '5e9ec7131c9d44000068b413', category: 'Одежда' });
    const [title, settitle] = useState('');
    const [description, setDescription] = useState<string | undefined>('');
    const [tags, setTags] = useState(['start tags']);
    const [photos, setPhotos] = useState<FileList[]>([]);
    const photoElem = useRef<HTMLInputElement>(null);
    const [upload, setUpload] = useState(false);
    const [updated, setUpdated] = useState(false)

    const history = useHistory();
    const { itemId } = useParams()

    useEffect(() => {
        if (props.error === null && updated) {
            history.push('/user')
        } else { setUpdated(false) }
    }, [props.items])

    useEffect(() => {
        const item = props.items.find((item) => item._id === itemId);
        if (item) {
            setCategory(item.category);
            settitle(item.title);
            setDescription(item.description);
            if (item.tags) {
                setTags(getArray(item.tags));
            }
        }
    }, [props.items, itemId]);

    const getArray = (obj: ITagType[]): string[] => {
        let array: string[] = [];
        obj.map(tag => { tag && array.push(tag.tag) });
        return array;
    };

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({
            _id: event.target.value,
            category: event.target.name
        });
    };

    const handleAdd = (event: any) => {
        event.preventDefault();

        const newTags: ITagType[] = [];
        for (const tag of tags) {
            newTags.push({ tag: tag });
        }

        const item: IItem = {
            title: title,
            category,
            description: description,
            // photos: photos
            tags: newTags

        };
        props.addNewItem(props.id, item);
        setUpdated(true);
    };


    const handlePhotoAdd = (event: any) => {
        if (photos.length < 5) {
            setPhotos([...photos, ...event.target.files]);
        } else {
            setUpload(true);
        }

    };
    const handleRemove = (index: number) => {
        setPhotos([...photos.slice(0, index), ...photos.slice(index + 1)]);
    };

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
        <Box flex='grow' direction='row' wrap={true} width='large'>
            <input type='file' style={{ display: 'none' }} onChange={handlePhotoAdd} ref={photoElem} multiple name='item-files' accept="image/png, image/jpeg" />
            <UploadImageHolder onClick={() => photoElem.current?.click()} />

            {photos.length !== 0 ? (
                photos.map((photo, index) => <UploadImageHolder id={index} imgSrc={URL.createObjectURL(photo)} onRemove={handleRemove} />)) : (<></>)
            } </Box>
        {
            upload ? (<Text color='status-error'>Вы не можете загрузить больше 5 фотографий</Text>) : <></>
        }

        <Button label='Добавить' onClick={handleAdd} ></Button>
    </Box>)
};
const mapStateToProps = (state: AppState) => ({
    id: state.auth.user._id,
    loading: state.items.loading,
    items: state.items.items,
    error: state.items.error
});

export default connect(mapStateToProps, { addNewItem })(ItemCard);
