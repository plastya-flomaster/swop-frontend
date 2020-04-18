import React from 'react';

import { Box, Button, Grommet, Keyboard, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormClose } from 'grommet-icons';

//подсказывающиеся теги
const allSuggestions: string[] = [];

interface ITag {
    children: any,
    onRemove: () => void,
    [x: string]: any
}
interface ITagInput {
    value: string[],
    onAdd: (tag: string) => void,
    onChange: (event: any) => void,
    onRemove: (v: string) => void,
    [x: string]: any
}
interface ITagTextInput {
    selectedTags: string[],
    setSelectedTags: (tags: string[]) => void
}

const Tag: React.FC<ITag> = ({ children, onRemove, ...rest }) => {

    const tag = (
        <Box
            direction='row'
            align='center'
            background='brand'
            pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
            margin={{ vertical: 'xxsmall' }}
            round='medium'
            {...rest}
        >
            <Text size='xsmall' margin={{ right: 'xxsmall' }}>
                {children}
            </Text>
            {onRemove && <FormClose size='small' color='white' />}
        </Box>
    );

    if (onRemove) {
        return <Button onClick={onRemove}>{tag}</Button>;
    }
    return tag;
};

const TagInput: React.FC<ITagInput> = ({ value = [], onAdd, onChange, onRemove, ...rest }) => {
    const [currentTag, setCurrentTag] = React.useState('');
    let box;

    const updateCurrentTag = (event: any) => {
        setCurrentTag(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    const onAddTag = (tag: string) => {
        if (onAdd) {
            onAdd(tag);
        }
    };

    const onEnter = () => {
        if (currentTag.length) {
            onAddTag(currentTag);
            setCurrentTag('');
        }
    };

    const renderValue = () =>
        value.map((v, index) => (
            <Tag
                margin='xxsmall'
                key={`${v}${index + 0}`}
                onRemove={() => onRemove(v)}
            >
                {v}
            </Tag>
        ));

    return (
        <Keyboard onEnter={onEnter}>
            <Box
                direction='row'
                align='center'
                ref={(e) => (box = e)}
                wrap
                width='500px'
            >
                {value.length > 0 && renderValue()}
                <Box flex style={{ minWidth: '250px' }}>
                    <TextInput
                        type='search'
                        plain
                        dropTarget={box}
                        {...rest}
                        onChange={updateCurrentTag}
                        value={currentTag}
                        onSelect={(event: any) => {
                            event.stopPropagation();
                            onAddTag(event.suggestion);
                        }}
                    />
                </Box>
            </Box>
        </Keyboard>
    );
};

const TagTextInput: React.FC<ITagTextInput> = ({selectedTags, setSelectedTags}) => {
    
       
    const [suggestions, setSuggestions] = React.useState(allSuggestions);



    const onRemoveTag = (tag: string) => {
        const removeIndex = selectedTags.indexOf(tag);
        const newTags = [...selectedTags];
        if (removeIndex >= 0) {
            newTags.splice(removeIndex, 1);
        }
        setSelectedTags(newTags);
    };

    const onAddTag = (tag: string) => {
        if ( !selectedTags || selectedTags.indexOf(tag) < 0) {
            setSelectedTags([...selectedTags, tag]);
        }

    };

    const onFilterSuggestion = (value: string) =>
        setSuggestions(
            allSuggestions.filter(
                suggestion => suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
        );

    return (
        <Grommet full theme={grommet}>
            <Box>
                <TagInput
                    placeholder='Добавить иноформацию...'
                    suggestions={suggestions}
                    value={selectedTags}
                    onRemove={onRemoveTag}
                    onAdd={onAddTag}
                    onChange={({ target: { value } }) => onFilterSuggestion(value)}
                />
            </Box>
        </Grommet>
    );
};
export default TagTextInput;
