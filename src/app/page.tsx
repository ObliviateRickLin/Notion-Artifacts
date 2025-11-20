"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DEFAULT_TEMPLATE } from "@/lib/templates";
import { createGist } from "@/lib/github";
import CodeEditor from "@/components/CodeEditor";
import PreviewWindow from "@/components/PreviewWindow";
import NavHeader from "@/components/NavHeader";
import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  const [code, setCode] = useState(DEFAULT_TEMPLATE);
  const [token, setToken] = useLocalStorage("notion_artifacts_gh_token", "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!token) {
      toast.error("Please set your GitHub Token first!");
      return;
    }

    setIsSaving(true);
    try {
      const gist = await createGist(token, code);
      const shareUrl = `${window.location.origin}/view/${gist.id}`;

      navigator.clipboard.writeText(shareUrl);
      toast.success("Artifact saved & URL copied!", {
        description: "Paste it into Notion /embed",
        action: {
          label: "Copy Again",
          onClick: () => navigator.clipboard.writeText(shareUrl),
        },
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to save Gist", {
        description: error.message || "Check your token and try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <NavHeader
        token={token}
        setToken={setToken}
        onSelectTemplate={setCode}
        onSave={handleSave}
        isSaving={isSaving}
      />
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={30}>
            <CodeEditor value={code} onChange={(val) => setCode(val || "")} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <PreviewWindow code={code} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
