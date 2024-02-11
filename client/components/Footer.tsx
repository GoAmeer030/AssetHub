"use client";

import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <div className="fixed bottom-5">
            <p className="text-sm text-muted-foreground flex items-center flex-wrap">
                Mentored by{" "}
                <a
                    href="https://www.linkedin.com/in/suresh-kumar-009431121/"
                    target="__blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4 text-primary"
                >
                    Suresh Kumar V S
                </a>{" "}
                • Crafted by{" "}
                <a
                    href="https://github.com/GoAmeer030"
                    target="__blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4 text-primary"
                >
                    Mohamed Ameer Noufil N
                </a>{" "}
                • The source code is on{" "}
                <a
                    href="https://github.com/GoAmeer030/Noter"
                    target="__blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4 text-primary"
                >
                    GitHub
                </a>
            </p>
        </div>
    );
}