import React, {Component, Dispatch, SetStateAction} from 'react';
import {AutoSizer, List, InfiniteLoader} from 'react-virtualized';

import ListItem from '../components/home/ListItem';
import Select from "../components/form/Select";
import { getLSItem, setLSItem } from '../utils/localStorage'

const API: string | undefined = process.env.REACT_APP_API;
const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

interface IState {
    currentPage: number,
    totalPages: number,
    sortBy?: string,
}

interface IProps {
    movies: IDataResponse[];
    setMovies: Dispatch<SetStateAction<IDataResponse[]>>;
}

export interface IDataResponse {
    title: string;
    id: string;
    poster_path: string;
}

const typeSort = {
    'popularity.asc' : 'Популярность по возрастанию',
    'popularity.desc' : 'Популярность по убыванию',
    'release_date.asc' : 'Дата выхода по возрастанию',
    'release_date.desc' : 'Дата выхода по убыванию',
    'vote_average.asc' : 'Рейтинг по возрастанию',
    'vote_average.desc' : 'Рейтинг выхода по убыванию',
};

class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPages: 1,
            sortBy: getLSItem('sortBy') || 'popularity.desc',
        };
    }

    async componentDidMount() {
        await this.getPage('init')
    }

    loadMoreRows = () => {
        return this.getPage('next')
    };

    isRowLoaded = ({index}:
                       { index: number }) => !!this.props.movies[index];

    getPage = (action: string = 'next') => {
        interface IResponse {
            page: number,
            total_pages: number,
            results: [],
        }

        const init = {
            option: {
                page: `1`,
            },
            setState: (data: IResponse) => {
                this.props.setMovies([...data.results])
            }
        };

        const next = {
            option: {
                page: `${this.state.currentPage + 1}`,
            },
            setState: (data: IResponse) => {
                this.props.setMovies([...this.props.movies, ...data.results])
            }
        };

        const activeAction = action === 'next' ? next : init;

        type KeysParams = "api_key" | "page" | "sort_by"

        const params: Record<KeysParams, string> = {
            api_key: `${API_KEY}`,
            sort_by: `${this.state.sortBy}`,
            ...activeAction.option
        };

        let url = new URL(`${API}`);
        url.search = String(new URLSearchParams(params));

        return fetch(String(url))
            .then(response => response.json())
            .then(data => {
                this.setState({currentPage: data.page});
                this.setState({totalPages: data.total_pages});
                activeAction.setState(data)
            });
    };

    rowRenderer = (params: { index: number, key: string, style: object }) => {
        return (
            <ListItem movies={this.props.movies} keyId={params.key} {...params} />
        )
    };

    bySort= (type: string) => {
        setLSItem('sortBy', type);
        this.setState({sortBy: type},
            () => {
                window.location.reload()
            })
    };

    render() {
        const hasNextPage = this.state.totalPages - this.state.currentPage;
        const nextRowCount = hasNextPage ? this.props.movies.length + 1 : this.props.movies.length;
        const rowCount = this.props.movies.length;

        return (
            <>
                <Select
                    libel="Сортировка"
                    callback={this.bySort}
                    select={typeSort}/>
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={nextRowCount}
                >
                    {({onRowsRendered, registerChild}) => (
                        <AutoSizer>
                            {({height, width}) => (
                                <List
                                    height={height}
                                    onRowsRendered={onRowsRendered}
                                    ref={registerChild}
                                    rowCount={rowCount}
                                    rowHeight={120}
                                    rowRenderer={this.rowRenderer}
                                    width={width}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </>
        );
    }
}

export default Home;
