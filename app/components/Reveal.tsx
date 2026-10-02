"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current!;

        if(!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            { 
                threshold: 0.15,
            }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transform-gpu transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                visible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-8 scale-[0.97] opacity-0"
            }`}
        >
            {children}
        </div>
    );
}