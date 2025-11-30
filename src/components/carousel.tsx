"use client";

import { Card, CardContent } from "./ui/card";
import { Carousel as UICarousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import ImageWithFallback from "./image-with-fallback";
import { useEffect, useState } from "react";
import { ItemCard } from "./item-card";

interface BookCarouselProps {
    title: string;
    items: {
        id: string;
        cover: string | null;
        title: string;
    }[];
    onEndReached: () => void;
}

export const Carousel = ({
    title,
    items,
    onEndReached,
}: BookCarouselProps) => {

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
            </CarouselContent>
        </UICarousel>
    );
}