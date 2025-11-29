"use client";

import { api } from "~/trpc/react";
import { Carousel } from "~/components/carousel";



export const RecentlyAddedBooksCarousel = ({ libraryId }: { libraryId?: string }) => {
    const books = api.books.recentlyAdded.useInfiniteQuery({libraryId}, {
        getNextPageParam: ({pagination}) => pagination.nextPage
    });

    const bookList = books.data?.pages.reduce((prev, curr) => ({books: [...prev.books, ...curr.books], pagination: curr.pagination}));

    return (<Carousel title="Recently Added Books" items={bookList?.books ?? []} onEndReached={() => books.fetchNextPage()} />);
}

export const RecentlyAddedSeriesCarousel = ({ libraryId }: { libraryId?: string }) => {
    const series = api.series.recentlyAdded.useInfiniteQuery({libraryId}, {
        getNextPageParam: ({pagination}) => pagination.nextPage
    });

    const seriesList = series.data?.pages.reduce((prev, curr) => ({series: [...prev.series, ...curr.series], pagination: curr.pagination}));

    return (<Carousel title="Recently Added Series" items={seriesList?.series ?? []} onEndReached={() => series.fetchNextPage()} />);
}

export const RecentlyUpdatedSeriesCarousel = ({ libraryId }: { libraryId?: string }) => {
    const series = api.series.recentlyUpdated.useInfiniteQuery({libraryId}, {
        getNextPageParam: ({pagination}) => pagination.nextPage
    });

    const seriesList = series.data?.pages.reduce((prev, curr) => ({series: [...prev.series, ...curr.series], pagination: curr.pagination}));

    return (<Carousel title="Recently Updated Series" items={seriesList?.series ?? []} onEndReached={() => series.fetchNextPage()} />);
}