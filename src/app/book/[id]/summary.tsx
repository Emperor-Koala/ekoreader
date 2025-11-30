"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";

export const Summary = ({ summary }: { summary: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const [expandedHeight, setExpandedHeight] = useState(0);

    useEffect(() => {
        if (ref.current) setExpandedHeight(ref.current?.getBoundingClientRect().height)
    }, [ref]);

    return (
        <>
            <div 
                className="max-h-27 overflow-hidden transition-[max-height] duration-300 ease-[ease] transition-normal" 
                style={isExpanded ? { maxHeight: expandedHeight } : {}}
            >
                <p className="text-sm" ref={ref}>{summary}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>Read More</Button>
        </>
    );
}