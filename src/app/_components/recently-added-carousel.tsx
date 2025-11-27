"use client";

import { useEffect, useState } from "react";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
import { api } from "~/trpc/react";

export const RecentlyAddedCarousel = () => {
    const books = api.books.recentlyAdded.useInfiniteQuery({
        pageSize: 10,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage
    });

    const bookList = books.data?.pages.reduce((prev, curr) => ({books: [...prev.books, ...curr.books], nextPage: curr.nextPage}));
    console.debug("bookList", bookList);

    const [carouselApi, setCarouselApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!carouselApi) return;
        const handler = carouselApi.on('slidesInView', async (carouselApi) => {
            console.debug(carouselApi.canScrollNext())
            if (!carouselApi.canScrollNext()) {
                console.debug(books.hasNextPage);
                const res = await books.fetchNextPage();
                console.debug(res);
            }
        });

        return () => {
            handler.clear();
        }
    }, [carouselApi]);

    return (
        <div>
            <Carousel setApi={setCarouselApi} className="max-w-full">
                <div className="flex flex-row justify-between">
                    <p>Recently Added</p>
                    <div>
                        <CarouselPrevious className="static translate-0" />
                        <CarouselNext className="static translate-0" />
                    </div>
                </div>
                <CarouselContent className="right-0">
                    {bookList?.books.map((book) => (
                        <CarouselItem key={book.id} className="max-w-full flex-none">
                            <p>{book.title}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}