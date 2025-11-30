import ImageWithFallback from "~/components/image-with-fallback";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { Pagination } from "./pagination";
import { ItemCard } from "~/components/item-card";

export default async function BooksPage({params, searchParams}: PageProps<'/library/[id]'>) {
    const {id} = await params;

    const {
        "books.page": page,
        "books.pageSize": pageSize,
    } = await searchParams;

    const { books, pagination } = await api.books.list({
        libraryId: id,
        pageSize: Number(pageSize) || 15,
        page: Number(page) || 0,
    });

    return (
        <div>
            <Pagination 
                totalPages={pagination.totalPages} 
                currentPage={Number(page) || 0}
                canGoForward={pagination.nextPage !== null} 
                canGoBack={pagination.previousPage !== null}
            />
            <div className="flex flex-row flex-wrap gap-4">
                {books.map((book) => (
                    <ItemCard key={`book-${book.id}`} title={book.title} cover={book.cover} />
                ))}
            </div>
            <Pagination 
                totalPages={pagination.totalPages} 
                currentPage={Number(page) || 0}
                canGoForward={pagination.nextPage !== null} 
                canGoBack={pagination.previousPage !== null}
            />
        </div>
    );
}