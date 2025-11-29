import { RecentlyAddedBooksCarousel, RecentlyAddedSeriesCarousel, RecentlyUpdatedSeriesCarousel } from "~/app/_components/shared-carousels";

export default async function BooksPage({ params }: PageProps<"/library/[id]">) {
    const {id} = (await params);
    return (
        <div className="flex flex-col gap-y-8">
            <RecentlyAddedBooksCarousel libraryId={id} />
            <RecentlyAddedSeriesCarousel libraryId={id}/>
            <RecentlyUpdatedSeriesCarousel libraryId={id} />
        </div>
    );
}