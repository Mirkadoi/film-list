import React, {Component, Dispatch, SetStateAction } from 'react';
import {AutoSizer, List, InfiniteLoader} from 'react-virtualized';

import ListItem from '../components/home/ListItem';

const API = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = '4237669ebd35e8010beee2f55fd45546';

interface IState {
    currentPage: number,
    totalPages: number,
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

class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPages: 1,
        }
    }

    async componentDidMount() {
       await this.getPage()
    }

    loadMoreRows = () => {
        return this.getPage(1)
    };

    isRowLoaded = ({index}:
                       { index: number }) => !!this.props.movies[index];

    getPage = (coefficient: number = 0) => {
        type KeysParams = "api_key" | "page"

        const params: Record<KeysParams, string> = {
            api_key: `${API_KEY}`,
            page: `${this.state.currentPage + coefficient}`,
        };

        let url = new URL(API);
        url.search = String(new URLSearchParams(params));

        return fetch(String(url))
            .then(response => response.json())
            .then(data => {
                this.setState({currentPage: data.page});
                this.setState({totalPages: data.total_pages});
                this.props.setMovies([...this.props.movies, ...data.results])
            });
    };

    rowRenderer = (params: {index: number, key: string, style: object}) => {
        return (
            <ListItem movies={this.props.movies} keyId={params.key} {...params} />
        )
    };

    render() {
        const hasNextPage = this.state.totalPages - this.state.currentPage;
        const nextRowCount = hasNextPage ? this.props.movies.length + 1 : this.props.movies.length;
        const rowCount = this.props.movies.length;

        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={nextRowCount}
            >
                {({onRowsRendered, registerChild}) => (
                    <AutoSizer>
                        {({height, width}) => (
                            <List
                                style={{padding: '10px 20px'}}
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
        );
    }
}

export default Home;
