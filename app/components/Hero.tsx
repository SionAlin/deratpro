"use client";

import { useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import * as THREE from "three";

export default function Hero(){
    const { t } = useLang();
    const mount = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = mount.current!;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(el.clientWidth, el.clientHeight);
        el.appendChild(renderer.domElement);

        // poliedru
        const shieldGeo = new THREE.IcosahedronGeometry(2, 1);
        const shieldMat = new THREE.MeshBasicMaterial({ color: 0xff7a3d, wireframe: true, transparent: true, opacity: 0.55 });
        const shield = new THREE.Mesh(shieldGeo, shieldMat);
        scene.add(shield);

        // sfera
        const coreGeo = new THREE.SphereGeometry(1.5, 50, 50);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0xff7a3d,
            emissive: 0xff7a3d,
            emissiveIntensity: 0.6,
            roughness: 0.4,
            metalness: 0.1,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        const glowGeo = new THREE.SphereGeometry(1.55, 50, 50);
        const glowMat = new THREE.MeshBasicMaterial({
        color: 0xff7a3d,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        scene.add(glow);

        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const light = new THREE.PointLight(0xffffff, 40, 20);
        light.position.set(4, 3, 5);
        scene.add(light);

        const N = 350;
        const pos = new Float32Array(N*3);
        for(let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 14;
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const pMat = new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.04 });
        const points = new THREE.Points(pGeo, pMat);
        scene.add(points);

        const mouse = { x: 0, y: 0 };
        const onMove = (e: PointerEvent) => {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("pointermove", onMove);

        const ro = new ResizeObserver(() => {
            camera.aspect = el.clientWidth / el.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(el.clientWidth, el.clientHeight);
        });
        ro.observe(el);

        let raf = 0;
        const tick = () => {
            shield.rotation.y += 0.003;
            shield.rotation.x += 0.001;
            points.rotation.y -= 0.0006;
            camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.03;
            camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.03;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
            raf = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener("pointermove", onMove);
            shieldGeo.dispose();
            shieldMat.dispose();
            pGeo.dispose();
            pMat.dispose();
            coreGeo.dispose();
            coreMat.dispose();
            renderer.dispose();
            glowGeo.dispose();
            glowMat.dispose();
            el.removeChild(renderer.domElement);
        };
    }, []);

    return(
        <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
            <div ref={mount} className="absolute inset-0 opacity-70 md:left-1/3" aria-hidden />
            <div className="relative mx-auto w-full max-w-6xl px-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
                    {t.hero.badge}
                </p>
                <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">
                    {t.hero.title} <span className="text-primary">DeratPro</span>
                </h1>
                <p className="mt-6 max-w-xl text-zinc-400">
                    {t.hero.text}
                </p>
                <a href="#contact" className="mt-8 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-black transition hover:brightness-110">
                    {t.hero.cta}
                </a>
                <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 text-sm">
                    {t.hero.stats.map((s) => (
                        <div key={s.label}>
                        <dt className="text-2xl font-bold text-accent">{s.value}</dt>
                        <dd className="text-zinc-500">{s.label}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}