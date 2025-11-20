"use client";

interface PreviewWindowProps {
    code: string;
}

export default function PreviewWindow({ code }: PreviewWindowProps) {
    return (
        <div className="h-full w-full overflow-hidden rounded-lg border border-border bg-background">
            <iframe
                srcDoc={code}
                title="Preview"
                className="h-full w-full border-none"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
        </div>
    );
}
