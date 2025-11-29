"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    canGoForward: boolean;
    canGoBack: boolean;
}

export const Pagination = ({
    totalPages,
    currentPage,
    canGoForward,
    canGoBack,
}: PaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const nextPage = () => {
        const params = new URLSearchParams(searchParams);
        params.set('books.page', `${(Number(params.get('books.page')) || 0)+1}`);
        replace(`${pathname}?${params.toString()}`);
    }

    const prevPage = () => {
        const params = new URLSearchParams(searchParams);
        params.set('books.page', `${(Number(params.get('books.page')) || 1)-1}`);
        replace(`${pathname}?${params.toString()}`);
    }

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('books.page', `${page}`);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex items-center justify-center gap-x-2 my-2">
            <Button 
                size="icon" 
                disabled={!canGoBack} 
                onClick={prevPage}
                variant="secondary"
            >
                <ChevronLeftIcon />
            </Button>
            {Array.from({length: totalPages}).map((_, page) => (
                <Button 
                    key={`page-${page}`} 
                    size="icon"
                    onClick={currentPage !== page ? () => goToPage(page) : undefined}
                    variant="secondary"
                    className={`${currentPage === page ? 'bg-blue-200' : ''}`}
                >
                    {page+1}
                </Button>
            ))}
            <Button 
                size="icon" 
                disabled={!canGoForward} 
                onClick={nextPage}
                variant="secondary"
            >
                <ChevronRightIcon />
            </Button>
        </div>
    );
}