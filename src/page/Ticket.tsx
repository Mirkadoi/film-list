import React, {FC} from 'react';
import {useLocation} from 'react-router-dom';
import {Card, ListGroup, Image} from 'react-bootstrap';
import useWindowSize from '../hook/useWindowSize';

import styles from './Ticket.module.scss'

const Ticket: FC = () => {
    const {state: {movieInfo}} = useLocation();
    const size = useWindowSize();
    const {
        title,
        release_date,
        poster_path,
        backdrop_path,
        vote_count,
        vote_average,
        overview,
    } = movieInfo;

    const URL = 'https://image.tmdb.org/t/p/w500/';
    const POSTER_URL = size.width <= 576
        ? `${URL}${backdrop_path}`
        : `${URL}${poster_path}`;

    return (
        <div className={styles.wrapper}>
            <div className={styles.ticket} >
                <div
                    className={styles.backdrop}
                    style={{backgroundImage: `url(${URL}${backdrop_path})`}}/>
                <Image thumbnail className={styles.poster} src={`${POSTER_URL}`} />
                <Card className={styles.card}>
                    <Card.Header as='h2'>{title}</Card.Header>
                    <Card.Body>
                        <b>Синопсис:</b> {overview}
                    </Card.Body>
                    <ListGroup variant='flush'>
                        <ListGroup.Item><b>Дата выхода:</b> {release_date}</ListGroup.Item>
                        <ListGroup.Item><b>Рейтинг:</b> {vote_average}</ListGroup.Item>
                        <ListGroup.Item><b>Количество оценок:</b> {vote_count}</ListGroup.Item>
                    </ListGroup>
                </Card>

            </div>
        </div>
    );
};

export default Ticket;
