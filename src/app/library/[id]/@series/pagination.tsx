"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";

export const Pagination = ({totalPages, canGoForward, canGoBack}: {totalPages: number, canGoForward: boolean, canGoBack: boolean}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const nextPage = () => {
        const params = new URLSearchParams(searchParams);
        params.set('series.page', `${(Number(params.get('series.page')) || 0)+1}`);
        replace(`${pathname}?${params.toString()}`);
    }

    const prevPage = () => {
        const params = new URLSearchParams(searchParams);
        params.set('series.page', `${(Number(params.get('series.page')) || 1)-1}`);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex items-center justify-center gap-x-2 my-2">
            <Button size="icon" disabled={!canGoBack} onClick={prevPage}>
                <ChevronLeftIcon />
            </Button>
            {Array.from({length: totalPages}).map((_, page) => (
                <Button key={`page-${page}`} size="icon">{page+1}</Button>
            ))}
            <Button size="icon" disabled={!canGoForward} onClick={nextPage}>
                <ChevronRightIcon />
            </Button>
        </div>
    );
}