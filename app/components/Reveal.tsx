"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({
    children,
    delay = 1,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current!;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect(); // animația rulează o singură dată
                }
            },
            { threshold: 0.15 } // când 15% din element e vizibil
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
        ref={ref}
        style={{ transitionDelay: `${delay}ms` }}
        className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
            visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
        }`}
        >
        {children}
        </div>
    );
}