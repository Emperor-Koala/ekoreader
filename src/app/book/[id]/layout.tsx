import { ArrowLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function BookLayout({ children }: LayoutProps<"/book/[id]">) {
    return (
        <>
            <div className="flex flex-row p-3 bg-slate-300">
                <Button variant="ghost" size="icon">
                    <ArrowLeftIcon />
                </Button>
            </div>
            {children}
        </>
    );
}