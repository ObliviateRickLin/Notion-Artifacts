"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface TokenDialogProps {
    token: string;
    setToken: (token: string) => void;
}

export default function TokenDialog({ token, setToken }: TokenDialogProps) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(token);

    useEffect(() => {
        setInputValue(token);
    }, [token]);

    const handleSave = () => {
        setToken(inputValue);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>GitHub Settings</DialogTitle>
                    <DialogDescription>
                        Enter your GitHub Personal Access Token (Classic) to save artifacts as Gists.
                        The token is stored locally in your browser.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="token" className="text-right">
                            Token
                        </Label>
                        <Input
                            id="token"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="col-span-3"
                            type="password"
                            placeholder="ghp_..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save Token</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
