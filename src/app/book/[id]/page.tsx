import { BookOpenIcon, DownloadIcon, HatGlassesIcon } from "lucide-react";
import ImageWithFallback from "~/components/image-with-fallback";
import { Button } from "~/components/ui/button";
import { Chip } from "~/components/ui/chip";
import { api } from "~/trpc/server";
import { Summary } from "./summary";

export default async function BookPage({params}: PageProps<"/book/[id]">) {
    const {id} = await params;

    const book = await api.books.getById(id);

    if (!book) {
        // TODO 
        return null;
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-start">
                <ImageWithFallback src={book.cover} alt={book.title} width={212} height={0} className="aspect-[.707] m-3 rounded-sm" />
                <div className="flex-[0_0_66.667%] flex flex-col p-3 gap-y-3 items-start">
                    <h6><span className="text-xl font-semibold">Test</span> <span className="text-sm">in {book.library.name}</span></h6>
                    <div className="flex flex-row py-3 gap-4">
                        <Button className="bg-red-600 hover:bg-red-500"><BookOpenIcon /> Read</Button>
                        <Button><HatGlassesIcon /> Read</Button>
                        <Button><DownloadIcon /> Download</Button>
                    </div>
                    <Summary summary={book.summary} />
                </div>
            </div>
            <div className="grid grid-cols-[1fr_5fr] gap-y-2 p-3">
                {book.publisher && (
                    <>
                        <p>Publisher</p>
                        <div className="flex"><Chip>{book.publisher}</Chip></div>
                    </>
                )}
                {!!book.genre.length && (
                    <> 
                        <p>Genre</p>
                        <div className="flex flex-row gap-2">
                            {book.genre.map((genre) => (<Chip>{genre}</Chip>))}
                        </div>
                    </>
                )}
                <p>Writers</p>
                <div className="flex flex-row gap-2">
                    {book.authors.map((author) => (<Chip>{author}</Chip>))}
                </div>
                {!!book.tags.length && (
                    <> 
                        <p>Tags</p>
                        <div className="flex flex-row gap-2">
                            {book.tags.map((tag) => (<Chip>{tag}</Chip>))}
                        </div>
                    </>
                )}
                <p>File</p>
                <p>{book.file}</p>
                <p>Created</p>
                <p>{book.createdAt.toLocaleString('en-us', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                <p>Last Modified</p>
                <p>{book.updatedAt?.toLocaleString('en-us', { dateStyle: 'medium', timeStyle: 'short' })}</p>
            </div>
        </div>
    );
}