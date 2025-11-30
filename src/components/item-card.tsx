import ImageWithFallback from "./image-with-fallback";
import { Card, CardContent } from "./ui/card";

interface ItemCardProps {
    cover: string | null;
    title: string;
}

export const ItemCard = ({cover, title}: ItemCardProps) => {
    return (
        <Card className="p-0 overflow-clip rounded-sm">
            <CardContent className="p-0 flex flex-col">
                <ImageWithFallback src={cover} alt={title} className="aspect-[.707]" width={150} height={0} objectFit="contain" />
                <div className="px-2">
                    <p className="line-clamp-2 text-sm">{title}</p>
                </div>
            </CardContent>
        </Card>
    );
}