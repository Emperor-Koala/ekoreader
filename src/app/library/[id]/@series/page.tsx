import ImageWithFallback from "~/components/image-with-fallback";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { Pagination } from "./pagination";
import { ItemCard } from "~/components/item-card";

export default async function SeriesPage({params, searchParams}: PageProps<'/library/[id]'>) {
    const {id} = await params;

    const {
        "series.page": page,
        "series.pageSize": pageSize,
    } = await searchParams;

    const { series, pagination } = await api.series.list({
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
                {series.map((series) => (
                    <ItemCard key={`book-${series.id}`} title={series.title} cover={series.cover} />
                ))}
            </div>
        </div>
    );
}