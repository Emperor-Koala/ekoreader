"use client";

import { Carousel as UICarousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import { useEffect, useState } from "react";
import { ItemCard } from "./item-card";
import { Spinner } from "./ui/spinner";

interface CarouselProps {
    title: string;
    items: {
        id: string;
        cover: string | null;
        title: string;
    }[];
    loading?: boolean;
    onEndReached: () => void;
}

export const Carousel = ({
    title,
    items,
    loading = false,
    onEndReached,
}: CarouselProps) => {

    const [carouselApi, setCarouselApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!carouselApi) return;
        const handler = carouselApi.on('slidesInView', (carouselApi) => {
            if (!carouselApi.canScrollNext()) {
                onEndReached();
            }
        });

        return handler.clear;
    }, [carouselApi]);

    return (
        <UICarousel 
            setApi={setCarouselApi} 
            opts={{duration: 20, slidesToScroll: "auto"}} 
            className="max-w-full flex flex-col gap-2"
        >
            <div className="flex flex-row justify-between">
                <h3 className="text-xl font-semibold">{title}</h3>
                <div className="flex flex-row gap-2">
                    <CarouselPrevious className="static translate-0" />
                    <CarouselNext className="static translate-0" />
                </div>
            </div>
            <CarouselContent className="right-0">
                {items.map((item) => (
                    <CarouselItem key={item.id} className="max-w-full flex-none">
                        <ItemCard cover={item.cover} title={item.title} />
                    </CarouselItem>
                ))}
                {loading && (
                    <CarouselItem className="max-w-full flex-none">
                        <Spinner />
                    </CarouselItem>
                )}
            </CarouselContent>
        </UICarousel>
    );
}