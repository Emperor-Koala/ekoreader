import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ImageWithFallback from "~/components/image-with-fallback";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { Pagination } from "./pagination";

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
            <Pagination totalPages={pagination.totalPages} canGoForward={pagination.nextPage !== null} canGoBack={pagination.previousPage !== null} />
            <div className="flex flex-row flex-wrap gap-4">
                {series.map((series) => (
                    <Card key={`book-${series.id}`} className="p-0 overflow-clip">
                        <CardContent className="p-0 flex flex-col">
                            <ImageWithFallback src={series.cover} alt={series.title} className="aspect-[.707]" width={150} height={0} objectFit="contain" />
                            <div className="px-2">
                                <p className="line-clamp-2">{series.title}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}