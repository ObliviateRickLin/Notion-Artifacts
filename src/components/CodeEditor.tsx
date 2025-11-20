"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useRef } from "react";

interface CodeEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
    const editorRef = useRef(null);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // @ts-ignore
        editorRef.current = editor;
    };

    return (
        <div className="h-full w-full overflow-hidden rounded-lg border border-border bg-card">
            <Editor
                height="100%"
                defaultLanguage="html"
                theme="vs-dark"
                value={value}
                onChange={onChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    wordWrap: "on",
                    padding: { top: 16, bottom: 16 },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
}
