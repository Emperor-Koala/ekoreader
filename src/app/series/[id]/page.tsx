import { ArrowLeftIcon, BookOpenIcon, DownloadIcon, HatGlassesIcon, MoreVerticalIcon, PencilIcon } from "lucide-react";
import ImageWithFallback from "~/components/image-with-fallback";
import { Button } from "~/components/ui/button";
import { Chip } from "~/components/ui/chip";
import { api } from "~/trpc/server";
import { Summary } from "./summary";
import { ItemCard } from "~/components/item-card";

export default async function BookPage({params}: PageProps<"/book/[id]">) {
    const {id} = await params;

    const series = await api.series.getById(id);

    if (!series) {
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
                        <h5 className="text-xl font-semibold">{series.title}</h5>
                        •
                        <h6 className="text-sm italic">{series.books.length} Books</h6>
                    </div>
                </div>
                <div className="flex flex-row gap-x-2">
                    <Button variant="ghost"><PencilIcon /></Button>
                    <Button variant="ghost"><MoreVerticalIcon /></Button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row items-start">
                    <ImageWithFallback src={series.cover} alt={series.title} width={212} height={0} className="aspect-[.707] m-3 rounded-sm" />
                    <div className="flex-[0_0_66.667%] flex flex-col p-3 gap-y-3 items-start">
                        <div className="flex flex-row py-3 gap-4">
                            <Button><DownloadIcon /> Download</Button>
                        </div>
                        <Summary>
                            Summary from book 1:<br />
                            {series.books[0]?.summary}
                        </Summary>
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_5fr] gap-y-2 p-3">
                    <p>Library</p>
                    <p>{series.library.name}</p>
                    {series.publisher && (
                        <>
                            <p>Publisher</p>
                            <div className="flex"><Chip>{series.publisher}</Chip></div>
                        </>
                    )}
                    {!!series.genre.length && (
                        <> 
                            <p>Genre</p>
                            <div className="flex flex-row gap-2">
                                {series.genre.map((genre) => (<Chip>{genre}</Chip>))}
                            </div>
                        </>
                    )}
                    <p>Writers</p>
                    <div className="flex flex-row gap-2">
                        {series.authors.map((author) => (<Chip>{author}</Chip>))}
                    </div>
                    <p>Created</p>
                    <p>{series.createdAt.toLocaleString('en-us', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                    <p>Last Modified</p>
                    <p>{series.updatedAt?.toLocaleString('en-us', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
                <div className="flex flex-row flex-wrap gap-4 p-3">
                    {series.books.map((book) => (
                        <ItemCard cover={book.cover} title={book.title} />
                    ))}
                </div>
            </div>
        </>
    );
}