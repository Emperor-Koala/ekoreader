"use client";

import { api } from "~/trpc/react";
import { BookCarousel } from "~/components/book-carousel";

export const RecentlyAddedCarousel = () => {
    const books = api.books.recentlyAdded.useInfiniteQuery({
        pageSize: 10,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage
    });

    const bookList = books.data?.pages.reduce((prev, curr) => ({books: [...prev.books, ...curr.books], nextPage: curr.nextPage}));

    return (<BookCarousel title="Recently Added" books={bookList?.books ?? []} onEndReached={() => books.fetchNextPage()} />);
}