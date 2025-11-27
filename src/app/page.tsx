import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { CreateBookForm } from "./_components/create-book-form";
import { CreateLibraryForm } from "./_components/create-library-form";

export default async function Home() {
	const books = await api.books.listAll();

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col">
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add Library</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create Library</DialogTitle>
						</DialogHeader>
						<CreateLibraryForm />
					</DialogContent>
				</Dialog>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add Book</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create Book</DialogTitle>
						</DialogHeader>
						<CreateBookForm />
					</DialogContent>
				</Dialog>
				{books.map((book) => <p>{book.title}</p>)}
			</main>
		</HydrateClient>
	);
}
