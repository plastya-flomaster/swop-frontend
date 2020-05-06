import { ITagType, ICategory } from './interface';

export const getArray = (obj: ITagType[]): string[] => {
    let array: string[] = [];
    obj.map((tag) => {
      tag && array.push(tag.tag);
    });
    return array;
  };

  export const getOptions = (input: ICategory[]) => {
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