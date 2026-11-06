"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform sampler2D tMap;
  uniform vec2 uRes;
  uniform vec2 uImg;
  uniform vec2 uMouse;
  uniform vec2 uVelo;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv) {
    vec2 s = uRes / uImg;
    float scale = max(s.x, s.y);
    vec2 size = uImg * scale;
    vec2 offset = (uRes - size) * 0.5;
    return (uv * uRes - offset) / size;
  }

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uRes.x / uRes.y, 1.0);

    float dist = distance(uv * aspect, uMouse * aspect);
    float radius = 0.38;
    float strength = smoothstep(radius, 0.0, dist) * uHover;

    // Liquid ripple distortion
    float n = noise(uv * 6.0 + uTime * 0.6);
    float ripple = sin(dist * 28.0 - uTime * 3.5) * 0.5 + 0.5;
    vec2 dir = normalize(uv - uMouse + 1e-5);

    vec2 displaced = uv;
    displaced -= dir * strength * 0.06 * ripple;
    displaced += (n - 0.5) * strength * 0.05;
    displaced -= uVelo * strength * 0.9;

    // Gentle breathing wave
    displaced.y += sin(uv.x * 4.0 + uTime * 0.5) * 0.0025;

    vec2 c = coverUv(displaced);
    float shift = strength * 0.012 + length(uVelo) * 0.4 * strength;
    float r = texture2D(tMap, c + dir * shift).r;
    float g = texture2D(tMap, c).g;
    float b = texture2D(tMap, c - dir * shift).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

interface HeroDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export function HeroDistortion({ src, alt, className = "" }: HeroDistortionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let raf = 0;
    let cleanup = () => {};

    (async () => {
      const { Renderer, Program, Mesh, Triangle, Texture, Vec2 } = await import("ogl");
      if (disposed || !wrap) return;

      let renderer: InstanceType<typeof Renderer>;
      try {
        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio, 2),
          alpha: false,
          antialias: false,
        });
      } catch {
        return; // WebGL unavailable -> keep fallback image
      }

      const gl = renderer.gl;
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.className = "absolute inset-0 h-full w-full pointer-events-none";
      wrap.appendChild(canvas);

      const texture = new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR });
      const uniforms = {
        tMap: { value: texture },
        uRes: { value: new Vec2(1, 1) },
        uImg: { value: new Vec2(1, 1) },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uVelo: { value: new Vec2(0, 0) },
        uHover: { value: 0 },
        uTime: { value: 0 },
      };

      const program = new Program(gl, { vertex, fragment, uniforms });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        if (disposed) return;
        texture.image = img;
        uniforms.uImg.value.set(img.naturalWidth, img.naturalHeight);
        setReady(true);
      };
      img.src = src;

      const resize = () => {
        if (!wrap) return;
        const { width, height } = wrap.getBoundingClientRect();
        if (width === 0 || height === 0) return;
        renderer.setSize(width, height);
        uniforms.uRes.value.set(width, height);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      // Pointer tracking
      const target = { x: 0.5, y: 0.5, hover: 0 };
      const current = { x: 0.5, y: 0.5 };

      const onMove = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        target.x = (e.clientX - r.left) / r.width;
        target.y = 1 - (e.clientY - r.top) / r.height;
        target.hover = 1;
      };

      const onLeave = () => {
        target.hover = 0;
      };

      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerenter", onMove);
      wrap.addEventListener("pointerleave", onLeave);

      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) loop(performance.now());
      });
      io.observe(wrap);

      let last = performance.now();
      const loop = (t: number) => {
        cancelAnimationFrame(raf);
        if (!visible || disposed) return;
        raf = requestAnimationFrame(loop);
        const dt = Math.min((t - last) / 1000, 0.05);
        last = t;

        const px = current.x;
        const py = current.y;
        current.x += (target.x - current.x) * 0.1;
        current.y += (target.y - current.y) * 0.1;
        uniforms.uMouse.value.set(current.x, current.y);

        const vx = current.x - px;
        const vy = current.y - py;
        uniforms.uVelo.value.set(
          uniforms.uVelo.value.x + (vx - uniforms.uVelo.value.x) * 0.15,
          uniforms.uVelo.value.y + (vy - uniforms.uVelo.value.y) * 0.15
        );
        uniforms.uHover.value += (target.hover - uniforms.uHover.value) * 0.06;
        uniforms.uTime.value += dt;

        renderer.render({ scene: mesh });
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerenter", onMove);
        wrap.removeEventListener("pointerleave", onLeave);
        canvas.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden cursor-crosshair ${className}`}>
      {/* Fallback Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

