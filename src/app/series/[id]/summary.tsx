"use client";

import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { Button } from "~/components/ui/button";

export const Summary = ({ children }: PropsWithChildren) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const [expandedHeight, setExpandedHeight] = useState(0);
    const [showReadMore, setShowReadMore] = useState(true);

    useEffect(() => {
        if (ref.current) {
            const maxHeight = ref.current?.getBoundingClientRect().height;
            setExpandedHeight(maxHeight);
            if (maxHeight <= 108) {
                setIsExpanded(true);
                setShowReadMore(false);
            }
        }
    }, [ref]);

    return (
        <>
            <div 
                className="max-h-27 overflow-hidden transition-[max-height] duration-300 ease-[ease] transition-normal" 
                style={isExpanded ? { maxHeight: expandedHeight } : {}}
            >
                <p className="text-sm" ref={ref}>{children}</p>
            </div>
            {showReadMore && <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>Read More</Button>}
        </>
    );
}