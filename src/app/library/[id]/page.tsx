import { RecentlyAddedBooksCarousel, RecentlyAddedSeriesCarousel, RecentlyUpdatedSeriesCarousel } from "~/app/_components/shared-carousels";
import NavigationBar from "./nav";

export default async function LibraryPage({ params }: PageProps<"/library/[id]">) {
    const {id} = await params;
    return (
        <div>
            <NavigationBar libraryId={id} selected="recommended" />
            
            <div className="flex flex-col gap-y-8">
                <RecentlyAddedBooksCarousel libraryId={id} />
                <RecentlyAddedSeriesCarousel libraryId={id}/>
                <RecentlyUpdatedSeriesCarousel libraryId={id} />
            </div>
        </div>
    );
}