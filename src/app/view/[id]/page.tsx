import { getGist } from "@/lib/github";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function ViewPage({ params }: PageProps) {
    let content = "";
    let error = "";

    try {
        const { id } = await params;
        const gist = await getGist(id);
        const file = gist.files ? Object.values(gist.files)[0] : null;

        if (file && file.content) {
            content = file.content;
        } else {
            error = "Artifact not found in Gist.";
        }
    } catch (e: any) {
        console.error(e);
        error = "Failed to load Artifact. " + (e.message || "");
    }

    if (error) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-black text-red-500 font-mono p-4 text-center">
                <div>
                    <h1 className="text-xl font-bold mb-2">Error</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <iframe
            srcDoc={content}
            className="h-screen w-screen border-none m-0 p-0 block overflow-hidden"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            title="Artifact View"
        />
    );
}
