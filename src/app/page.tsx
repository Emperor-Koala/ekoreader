import { HydrateClient } from "~/trpc/server";
import { RecentlyAddedBooksCarousel, RecentlyAddedSeriesCarousel, RecentlyUpdatedSeriesCarousel } from "./_components/shared-carousels";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col p-4">
				<RecentlyAddedBooksCarousel />
				<RecentlyAddedSeriesCarousel />
				<RecentlyUpdatedSeriesCarousel />
			</main>
		</HydrateClient>
	);
}
