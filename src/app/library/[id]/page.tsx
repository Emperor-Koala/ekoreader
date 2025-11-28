export default async function LibraryPage() {
    const libraryInfo = await new Promise<{title: string}>((resolve) => setTimeout(() => {
        resolve({title: "Test library"});        
    }, 2000));
    return (<p>{libraryInfo.title}</p>)
}