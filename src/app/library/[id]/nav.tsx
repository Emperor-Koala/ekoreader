import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NavigationBar({ 
    selected = "recommended",
    libraryId
}: { 
    selected?: "recommended" | "series" | "books",
    libraryId: string,
}) {
    return (
        <div className="flex flex-row items-center justify-center p-3 bg-slate-200">
            <div className="flex justify-center gap-x-3 bg-secondary rounded-md p-1">
                <Button 
                    size="sm" 
                    variant="secondary" 
                    className={`h-7 ${selected === 'recommended' && "bg-white shadow"}`}
                    asChild
                >
                    <Link href={`/library/${libraryId}`}>Recommended</Link>
                </Button>
                <Button 
                    size="sm" 
                    variant="secondary" 
                    className={`h-7 ${selected === 'series' && "bg-white shadow"}`}
                >
                    <Link href={`/library/${libraryId}/series`}>Series</Link>
                </Button>
                <Button 
                    size="sm" 
                    variant="secondary" 
                    className={`h-7 ${selected === 'books' && "bg-white shadow"}`}
                >
                    <Link href={`/library/${libraryId}/books`}>Books</Link>
                </Button>
            </div>
        </div>
    );
}