import { ArrowLeftIcon, BookOpenIcon, DownloadIcon, HatGlassesIcon, MoreVerticalIcon, PencilIcon } from "lucide-react";
import ImageWithFallback from "~/components/image-with-fallback";
import { Button } from "~/components/ui/button";
import { Chip } from "~/components/ui/chip";
import { api } from "~/trpc/server";
import { Summary } from "./summary";

export default async function BookPage({params}: PageProps<"/book/[id]">) {
    const {id} = await params;

    const book = await api.books.getById(id);

    if (!book) {
        // TODO 404
        return null;
    }

    return (
        <>
            <div className="flex flex-row p-3 bg-slate-300 items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <Button variant="ghost" size="icon">
                        <ArrowLeftIcon />
                    </Button> 
                    <div className="flex items-center gap-x-3">
                        <h5 className="text-xl font-semibold">Test</h5>
                        •
                        <h6 className="text-sm italic">{book.series.title}{book.seriesNumber ? ` #${book.seriesNumber}` : ''}</h6>
                    </div>
                </div>
                <div className="flex flex-row gap-x-2">
                    <Button variant="ghost"><PencilIcon /></Button>
                    <Button variant="ghost"><MoreVerticalIcon /></Button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row items-start">
                    <ImageWithFallback src={book.cover} alt={book.title} width={212} height={0} className="aspect-[.707] m-3 rounded-sm" />
                    <div className="flex-[0_0_66.667%] flex flex-col p-3 gap-y-3 items-start">
                        <div className="flex flex-row py-3 gap-4">
                            <Button className="bg-red-600 hover:bg-red-500"><BookOpenIcon /> Read</Button>
                            <Button><HatGlassesIcon /> Read</Button>
                            <Button><DownloadIcon /> Download</Button>
                        </div>
                        {book.releaseDate && (
                            <p className="text-sm">
                                Published: {new Date(book.releaseDate+'Z').toLocaleDateString('utc', {dateStyle: "medium", timeZone: 'utc'})}
                            </p>
                        )}
                        <Summary>{book.summary}</Summary>
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_6fr] gap-y-2 p-3">
                    <p>Library</p>
                    <p>{book.library.name}</p>
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
                                {book.genre.map((genre) => (<Chip key={`g-${genre}`}>{genre}</Chip>))}
                            </div>
                        </>
                    )}
                    <p>Writers</p>
                    <div className="flex flex-row gap-2">
                        {book.authors.map((author) => (<Chip key={`a-${author}`}>{author}</Chip>))}
                    </div>
                    {!!book.tags.length && (
                        <> 
                            <p>Tags</p>
                            <div className="flex flex-row gap-2">
                                {book.tags.map((tag) => (<Chip key={`t-${tag}`}>{tag}</Chip>))}
                            </div>
                        </>
                    )}
                    {book.isbn && (
                        <>
                            <p>ISBN</p>
                            <p>{book.isbn}</p>
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
        </>
    );
}