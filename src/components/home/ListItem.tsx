import React from 'react';
import {IDataResponse} from '../../page/Home';
import {Link} from 'react-router-dom';
import {Image, ListGroup, Button} from 'react-bootstrap';

import styles from './ListItem.module.scss'

const ListItem = ({keyId, index, style, movies}:
                      { index: number, keyId: string, style: object, movies: IDataResponse[] }) => {
    const {title, id, poster_path} = movies[index];

    return (

        <div
            key={keyId}
            style={style}
            className={styles.item}
        >
            <Image
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}/>
            <ListGroup className={styles.group}>
                <ListGroup.Item variant="info">
                    {title}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to={{
                        pathname: `/${id}`,
                        state: {movieInfo: movies[index]}
                    }}
                    >
                        <Button>Подробнее</Button>
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </div>

    )
};

export default ListItem;
