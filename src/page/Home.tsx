import React, {Component} from 'react';
import {AutoSizer, List, InfiniteLoader} from 'react-virtualized';

import ListItem from '../components/home/ListItem';

const API = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = '4237669ebd35e8010beee2f55fd45546';

interface IState {
    movies: IDataResponse[];
    currentPage: number,
    totalPages: number,
}

export interface IDataResponse {
    original_title: string;
}

class Home extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            movies: [],
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
                       { index: number }) => !!this.state.movies[index];

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
                this.setState({movies: [...this.state.movies, ...data.results]});
            });
    };

    rowRenderer = (props: {index: number, key: string, style: object}) => {
        return (
            <ListItem movies={this.state.movies} keyId={props.key} {...props} />
        )
    };

    render() {
        const hasNextPage = this.state.totalPages - this.state.currentPage;
        const nextRowCount = hasNextPage ? this.state.movies.length + 1 : this.state.movies.length;
        const rowCount = this.state.movies.length;

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
                                height={height}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={rowCount}
                                rowHeight={30}
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
