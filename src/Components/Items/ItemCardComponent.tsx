import React, { useState, useRef, useEffect } from 'react';
import {
  Heading,
  Box,
  RadioButtonGroup,
  TextInput,
  Button,
  TextArea,
  Text,
} from 'grommet';
import TagTextInput from './TagsInputComponent';
import { connect } from 'react-redux';
import UploadImageHolder from './ImageComponent';
import { IItem, ITagType, ICategory } from '../../utils/interface';
import { AppState } from '../../redux/Stores/store';
import {
  addNewItem,
  updateCurrentItem,
  removeItem,
} from '../../redux/Actions/itemsActions';
import { useParams, useHistory } from 'react-router-dom';

interface IItemCardProps {
  userId: string;
  error: any;
  items: IItem[];
  loading: boolean;
  categories: ICategory[];
  addNewItem: (userId: string, item: IItem) => void;
  updateCurrentItem: (userId: string, item: IItem) => void;
  removeItem: (userId: string, itemId: string) => void;
}

const ItemCard: React.FC<IItemCardProps> = ({
  userId,
  error,
  items,
  categories,
  addNewItem,
  updateCurrentItem,
  removeItem,
}) => {
  const [category, setCategory] = useState<string>(
    categories['5ead2e16b96074e77fd74897']
  );
  const [title, settitle] = useState('');
  const [description, setDescription] = useState<string | undefined>('');
  const [tags, setTags] = useState(['start tags']);
  const [photos, setPhotos] = useState<FileList[]>([]);
  const photoElem = useRef<HTMLInputElement>(null);
  const [upload, setUpload] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [buttonLabel, setButtonLabel] = useState<string>('Добавить');

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (error === null && updated) {
      history.push('/user');
    } else {
      setUpdated(false);
    }
  }, [items]);

  useEffect(() => {
    if (id !== 'new') {
      const item = items.find((item) => item._id === id);

      if (item) {
        setButtonLabel('Изменить');
        setCategory(item.category);
        settitle(item.title);
        setDescription(item.description);
        if (item.tags) {
          setTags(getArray(item.tags));
        }
      }
    }
  }, [items, id]);

  const getArray = (obj: ITagType[]): string[] => {
    let array: string[] = [];
    obj.map((tag) => {
      tag && array.push(tag.tag);
    });
    return array;
  };

  const getOptions = (input: ICategory[]) => {
    let opts = [];

    for (const elem in input) {
      let temp = {
        name: input[elem],
        value: elem,
        label: input[elem],
      };
      opts.push(temp);
    }
    return opts;
  };
  const options = getOptions(categories);

  const handleDelete = (event: any) => {
    event.preventDefault();
    removeItem(userId, id!);
    setUpdated(true);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();

    const newTags: ITagType[] = [];
    for (const tag of tags) {
      newTags.push({ tag: tag });
    }

    let item: IItem = {
      title,
      category: category,
      description,
      // photos: photos
      tags: newTags,
    };

    //добавлениие
    if (id === 'new') {
      addNewItem(userId, item);
    } //обновление объекта
    else {
      item = {
        _id: id,
        ...item,
      };
      updateCurrentItem(userId, item);
    }
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

  return (
    <Box flex="grow" direction="column" border pad="small">
      <Heading level={2} margin={{ bottom: '0' }}>
        {id == 'new' ? 'Новый предмет одежды' : `Изменить: ${title}`}
      </Heading>
      <Heading level={5} margin={{ vertical: '1rem' }}>
        Что вы хотите обменять?
      </Heading>
      <TextInput
        placeholder="Новый шарф H&M"
        value={title}
        onChange={(event) => settitle(event.target.value)}
      />
      <Heading level={5} margin={{ bottom: '1rem' }}>
        Выберите категорию
      </Heading>

      <RadioButtonGroup
        name="rbg"
        options={options}
        value={category}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCategory(event.target.value);
        }}
      />

      <Heading level={5} margin={{ vertical: '1rem' }}>
        Описание
      </Heading>
      <Box align="center" margin={{ bottom: '0px' }}>
        <TextArea
          fill
          placeholder="Введите описание, которое может помочь при выборе предмета одежды..."
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(event.target.value);
          }}
        />
      </Box>
      <Box>
        <Heading level={5} margin={{ vertical: '1rem' }}>
          Теги (до 10 штук)
        </Heading>
        <TagTextInput
          selectedTags={tags}
          setSelectedTags={(tags: []) => setTags(tags)}
        />
      </Box>
      <Heading level={5} margin={{ bottom: '1rem' }}>
        Загрузите фотографии
      </Heading>
      <Box flex="grow" direction="row" wrap={true} width="large">
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handlePhotoAdd}
          ref={photoElem}
          multiple
          name="item-files"
          accept="image/png, image/jpeg"
        />
        <UploadImageHolder onClick={() => photoElem.current?.click()} />
        {photos.length !== 0 ? (
          photos.map((photo, index) => (
            <UploadImageHolder
              id={index}
              imgSrc={URL.createObjectURL(photo)}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <></>
        )}{' '}
      </Box>
      {upload ? (
        <Text color="status-error">
          Вы не можете загрузить больше 5 фотографий
        </Text>
      ) : (
        <></>
      )}
      <Box flex="grow" direction="row" width="large">
        <Button
          label={buttonLabel}
          onClick={handleSubmit}
          size="medium"
        ></Button>
        {id !== 'new' ? (
          <Button label="Удалить" size="medium" onClick={handleDelete}></Button>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
const mapStateToProps = (state: AppState) => ({
  userId: state.auth.user._id,
  loading: state.items.loading,
  items: state.items.items,
  error: state.items.error,
});

export default connect(mapStateToProps, {
  addNewItem,
  updateCurrentItem,
  removeItem,
})(ItemCard);
