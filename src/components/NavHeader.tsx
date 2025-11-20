"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Save, Share2, Copy } from "lucide-react";
import TokenDialog from "./TokenDialog";
import { TEMPLATES } from "@/lib/templates";

interface NavHeaderProps {
    token: string;
    setToken: (token: string) => void;
    onSelectTemplate: (template: string) => void;
    onSave: () => void;
    isSaving: boolean;
}

export default function NavHeader({
    token,
    setToken,
    onSelectTemplate,
    onSave,
    isSaving,
}: NavHeaderProps) {
    return (
        <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-bold tracking-tight text-foreground">
                    Notion Artifacts
                </h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            Templates <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {Object.keys(TEMPLATES).map((name) => (
                            <DropdownMenuItem
                                key={name}
                                onClick={() => onSelectTemplate(TEMPLATES[name as keyof typeof TEMPLATES])}
                            >
                                {name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
                <TokenDialog token={token} setToken={setToken} />
                <Button onClick={onSave} disabled={isSaving} className="gap-2">
                    {isSaving ? (
                        "Saving..."
                    ) : (
                        <>
                            <Save className="h-4 w-4" /> Save & Share
                        </>
                    )}
                </Button>
            </div>
        </header>
    );
}
