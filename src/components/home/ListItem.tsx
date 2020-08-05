import React from 'react';
import { IDataResponse } from '../../page/Home';

const ListItem = ({keyId, index, style, movies}:
                      { index: number, keyId: string, style: object, movies: IDataResponse[] }) => {
    const {original_title} = movies[index];
    return (
        <div
            key={keyId}
            style={style}
        >
            {original_title}
        </div>
    )
};

export default ListItem;
