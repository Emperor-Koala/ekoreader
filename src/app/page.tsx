import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/better-auth";
import { getSession } from "~/server/better-auth/server";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "~/components/ui/dialog";

export default async function Home() {
	const books = await api.books.listAll();

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col">
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add Book</Button>
					</DialogTrigger>
					<DialogContent>
						{/* <CreateBookForm /> */}
					</DialogContent>
				</Dialog>
				{books.map((book) => <p>{book.title}</p>)}
			</main>
		</HydrateClient>
	);
}
