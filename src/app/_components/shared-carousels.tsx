"use client";

import { api } from "~/trpc/react";
import { Carousel } from "~/components/carousel";



export const RecentlyAddedBooksCarousel = ({ libraryId }: { libraryId?: string }) => {
    const books = api.books.recentlyAdded.useInfiniteQuery({}, {
        getNextPageParam: (lastPage) => lastPage.nextPage
    });

    const bookList = books.data?.pages.reduce((prev, curr) => ({books: [...prev.books, ...curr.books], nextPage: curr.nextPage}));

    return (<Carousel title="Recently Added Books" items={bookList?.books ?? []} onEndReached={() => books.fetchNextPage()} />);
}

export const RecentlyAddedSeriesCarousel = ({ libraryId }: { libraryId?: string }) => {
    const series = api.series.recentlyAdded.useInfiniteQuery({}, {
        getNextPageParam: (lastPage) => lastPage.nextPage
    });

    const seriesList = series.data?.pages.reduce((prev, curr) => ({series: [...prev.series, ...curr.series], nextPage: curr.nextPage}));

    return (<Carousel title="Recently Added Series" items={seriesList?.series ?? []} onEndReached={() => series.fetchNextPage()} />);
}

export const RecentlyUpdatedSeriesCarousel = ({ libraryId }: { libraryId?: string }) => {
    const series = api.series.recentlyUpdated.useInfiniteQuery({}, {
        getNextPageParam: (lastPage) => lastPage.nextPage
    });

    const seriesList = series.data?.pages.reduce((prev, curr) => ({series: [...prev.series, ...curr.series], nextPage: curr.nextPage}));

    return (<Carousel title="Recently Updated Series" items={seriesList?.series ?? []} onEndReached={() => series.fetchNextPage()} />);
}