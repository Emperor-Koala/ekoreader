import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { CreateBookForm } from "./_components/create-book-form";
import { CreateLibraryForm } from "./_components/create-library-form";
import { RecentlyAddedCarousel } from "./_components/recently-added-carousel";
// import "swiper/css/bundle";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col">
				<RecentlyAddedCarousel />
			</main>
		</HydrateClient>
	);
}
