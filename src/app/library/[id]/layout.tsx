import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function LibraryLayout({
    children,
    recommended,
    series,
    books,
}: LayoutProps<'/library/[id]'>) {

    return (
        <Tabs defaultValue="recommended">
            <div className="flex flex-row items-center p-3 bg-slate-200">
                <Suspense>
                    {children}
                </Suspense>
                <div className="flex-1 flex justify-center">
                    <TabsList className="gap-x-4">
                        <TabsTrigger value="recommended">Recommended</TabsTrigger>
                        <TabsTrigger value="series">Series</TabsTrigger>
                        <TabsTrigger value="books">Books</TabsTrigger>
                    </TabsList>
                </div>
            </div>

            <TabsContent value="recommended">
                {recommended}
            </TabsContent>
            <TabsContent value="series">
                {series}
            </TabsContent>
            <TabsContent value="books">
                {books}
            </TabsContent>
        </Tabs>
    );
}