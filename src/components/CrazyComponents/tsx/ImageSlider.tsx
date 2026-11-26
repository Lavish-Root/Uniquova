'use client';

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

// ==========================================
// TYPES & DEFAULTS
// ==========================================

export interface SlideItem {
    title?: string;
    status?: string;
    image: string;
}

export const DEFAULT_SLIDES: SlideItem[] = [
    {
        title: "Apex E-Commerce",
        status: "Marketplace Scaling",
        image: "/images/portfolio/apex_ecommerce.jpg",
    },
    {
        title: "Lumina Brand Identity",
        status: "Design & Strategy",
        image: "/images/portfolio/lumina_brand.jpg",
    },
    {
        title: "NovaCloud Platform",
        status: "Web & Mobile SaaS",
        image: "/images/portfolio/novacloud_saas.jpg",
    },
    {
        title: "VaultPay Fintech",
        status: "Financial Infrastructure",
        image: "/images/portfolio/vaultpay_fintech.jpg",
    },
    {
        title: "Zenith Health",
        status: "HealthTech Application",
        image: "/images/portfolio/zenith_health.jpg",
    },
];

export interface ImageSliderProps {
    slides?: SlideItem[];
    autoPlay?: boolean;
    interval?: number;
    className?: string;
    accentColor?: string;
    showPagination?: boolean;
    isExternalLoading?: boolean;
    fit?: "cover" | "contain";
    onAspectRatioChange?: (aspectRatio: number) => void;
}

// ==========================================
// SHADERS
// ==========================================

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D currentImage;
  uniform sampler2D nextImage;
  uniform float dispFactor;
  uniform float containerAspect;
  uniform float currentAspect;
  uniform float nextAspect;
  uniform float fitMode;

  vec2 getFittedUv(vec2 uv, float imgAspect, float contAspect, float isContain) {
    vec2 centered = uv - vec2(0.5);
    float safeImg = max(imgAspect, 0.0001);
    float safeCont = max(contAspect, 0.0001);

    if (isContain > 0.5) {
      if (safeCont > safeImg) {
        centered.x *= safeCont / safeImg;
      } else {
        centered.y *= safeImg / safeCont;
      }
    } else {
      if (safeCont > safeImg) {
        centered.y *= safeImg / safeCont;
      } else {
        centered.x *= safeCont / safeImg;
      }
    }
    return centered + vec2(0.5);
  }

  vec4 sampleFitted(sampler2D tex, vec2 texUv, float isContain) {
    vec4 color = texture2D(tex, clamp(texUv, 0.0, 1.0));
    if (isContain > 0.5) {
      float inBounds = step(0.0, texUv.x) * step(texUv.x, 1.0) * step(0.0, texUv.y) * step(texUv.y, 1.0);
      return color * inBounds;
    }
    return color;
  }

  void main() {
    float intensity = 0.6;
    vec2 cUv = getFittedUv(vUv, currentAspect, containerAspect, fitMode);
    vec2 nUv = getFittedUv(vUv, nextAspect, containerAspect, fitMode);

    vec4 orig1 = sampleFitted(currentImage, cUv, fitMode);
    vec4 orig2 = sampleFitted(nextImage, nUv, fitMode);

    vec4 _currentImage = sampleFitted(currentImage, vec2(cUv.x, cUv.y + dispFactor * (orig2.r * intensity)), fitMode);
    vec4 _nextImage = sampleFitted(nextImage, vec2(nUv.x, nUv.y + (1.0 - dispFactor) * (orig1.r * intensity)), fitMode);

    gl_FragColor = mix(_currentImage, _nextImage, dispFactor);
  }
`;

const getTextureAspect = (tex?: THREE.Texture | null): number => {
    const img = tex?.image as { naturalWidth?: number; naturalHeight?: number; width?: number; height?: number } | undefined;
    const w = img?.naturalWidth || img?.width || 16;
    const h = img?.naturalHeight || img?.height || 9;
    return h > 0 ? w / h : 16 / 9;
};

export default function ImageSlider({
    slides = DEFAULT_SLIDES,
    autoPlay = true,
    interval = 4000,
    className = "",
    accentColor = "#7545F5",
    showPagination = true,
    isExternalLoading = false,
    fit = "contain",
    onAspectRatioChange
}: ImageSliderProps) {
    const mountRef = useRef<HTMLDivElement>(null);

    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);
    const texturesRef = useRef<THREE.Texture[]>([]);
    const animationFrameRef = useRef<number>(0);
    const currentIndexRef = useRef<number>(0);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const onAspectRatioChangeRef = useRef(onAspectRatioChange);
    onAspectRatioChangeRef.current = onAspectRatioChange;

    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const slidesKey = slides.map((s) => s.image).join("|");

    // 1. INITIALIZATION & TEXTURE LOADING
    useEffect(() => {
        if (isExternalLoading) {
            setLoading(true);
            return;
        }

        if (!mountRef.current || !slides.length) {
            setLoading(false);
            setIsAnimating(false);
            return;
        }

        let isCancelled = false;
        setLoading(true);
        setIsAnimating(false);
        setActiveIndex(0);
        currentIndexRef.current = 0;

        const parent = mountRef.current;
        const width = parent.clientWidth || window.innerWidth;
        const height = parent.clientHeight || window.innerHeight;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch {
            // Fallback if WebGL context cannot be created
            setLoading(false);
            return;
        }

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
        camera.position.z = 1;
        cameraRef.current = camera;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        parent.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const loader = new THREE.TextureLoader();

        const promises = slides.map(slide => {
            return new Promise<THREE.Texture>((resolve) => {
                const isRemote = slide.image.startsWith("http://") || slide.image.startsWith("https://");
                loader.setCrossOrigin(isRemote ? "anonymous" : "");
                loader.load(
                    slide.image,
                    (tex) => {
                        tex.magFilter = THREE.LinearFilter;
                        tex.minFilter = THREE.LinearFilter;
                        resolve(tex);
                    },
                    undefined,
                    () => {
                        // Fallback texture if image load fails
                        const canvas = document.createElement("canvas");
                        canvas.width = 2;
                        canvas.height = 2;
                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                            ctx.fillStyle = "#160733";
                            ctx.fillRect(0, 0, 2, 2);
                        }
                        const fallbackTex = new THREE.CanvasTexture(canvas);
                        resolve(fallbackTex);
                    }
                );
            });
        });

        Promise.all(promises).then((loadedTextures) => {
            if (isCancelled) {
                loadedTextures.forEach((tex) => tex.dispose());
                return;
            }

            texturesRef.current = loadedTextures;

            const w = parent.clientWidth || width;
            const h = parent.clientHeight || height;
            const contAspect = h > 0 ? w / h : 16 / 9;
            const initialAspect = getTextureAspect(loadedTextures[0]);
            onAspectRatioChangeRef.current?.(initialAspect);

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    dispFactor: { value: 0.0 },
                    currentImage: { value: loadedTextures[0] },
                    nextImage: { value: loadedTextures[0] },
                    containerAspect: { value: contAspect },
                    currentAspect: { value: initialAspect },
                    nextAspect: { value: initialAspect },
                    fitMode: { value: fit === "contain" ? 1.0 : 0.0 },
                },
                vertexShader,
                fragmentShader,
                transparent: true,
            });
            materialRef.current = material;

            if (w > 0 && h > 0) {
                renderer.setSize(w, h);
                camera.left = w / -2;
                camera.right = w / 2;
                camera.top = h / 2;
                camera.bottom = h / -2;
                camera.updateProjectionMatrix();
            }

            const geometry = new THREE.PlaneGeometry(w, h);
            const mesh = new THREE.Mesh(geometry, material);
            meshRef.current = mesh;
            scene.add(mesh);
            setLoading(false);
        });

        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);
            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };
        animate();

        // Responsive resize observer for smooth adaptivity to container width & height
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const w = entry.contentRect.width;
                const h = entry.contentRect.height;
                if (w > 0 && h > 0 && rendererRef.current && cameraRef.current) {
                    rendererRef.current.setSize(w, h);
                    cameraRef.current.left = w / -2;
                    cameraRef.current.right = w / 2;
                    cameraRef.current.top = h / 2;
                    cameraRef.current.bottom = h / -2;
                    cameraRef.current.updateProjectionMatrix();

                    if (materialRef.current) {
                        materialRef.current.uniforms.containerAspect.value = w / h;
                    }

                    if (meshRef.current) {
                        meshRef.current.geometry.dispose();
                        meshRef.current.geometry = new THREE.PlaneGeometry(w, h);
                    }
                }
            }
        });
        resizeObserver.observe(parent);

        return () => {
            isCancelled = true;
            if (tweenRef.current) {
                tweenRef.current.kill();
                tweenRef.current = null;
            }
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameRef.current);
            texturesRef.current.forEach((tex) => tex.dispose());
            texturesRef.current = [];
            if (meshRef.current) {
                meshRef.current.geometry.dispose();
                meshRef.current = null;
            }
            if (materialRef.current) {
                materialRef.current.dispose();
                materialRef.current = null;
            }
            renderer.dispose();
            rendererRef.current = null;
            sceneRef.current = null;
            cameraRef.current = null;
            if (parent.contains(renderer.domElement)) {
                parent.removeChild(renderer.domElement);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slidesKey, isExternalLoading]);

    // 2. ANIMATION SYNC (Pure WebGL displacement transition without text clutter)
    useEffect(() => {
        if (loading || !materialRef.current || texturesRef.current.length === 0) return;
        if (currentIndexRef.current === activeIndex) return;

        const material = materialRef.current;
        const nextTexture = texturesRef.current[activeIndex];
        if (!nextTexture) return;

        if (tweenRef.current) {
            tweenRef.current.kill();
            tweenRef.current = null;
        }

        setIsAnimating(true);
        const nextAsp = getTextureAspect(nextTexture);
        onAspectRatioChangeRef.current?.(nextAsp);
        material.uniforms.nextImage.value = nextTexture;
        material.uniforms.nextAspect.value = nextAsp;

        // WebGL Image Transition with Liquid Ripple Effect
        tweenRef.current = gsap.to(material.uniforms.dispFactor, {
            duration: 1.4,
            value: 1,
            ease: "expo.inOut",
            onComplete: () => {
                if (materialRef.current === material) {
                    material.uniforms.currentImage.value = nextTexture;
                    material.uniforms.currentAspect.value = nextAsp;
                    material.uniforms.dispFactor.value = 0.0;
                    currentIndexRef.current = activeIndex;
                    setIsAnimating(false);
                    tweenRef.current = null;
                }
            },
        });
    }, [activeIndex, loading]);

    // Sync fit mode ("cover" | "contain") live if prop changes
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.fitMode.value = fit === "contain" ? 1.0 : 0.0;
        }
    }, [fit]);

    // Reset index if slides array shrinks
    useEffect(() => {
        if (slides.length > 0 && activeIndex >= slides.length) {
            setActiveIndex(0);
        }
    }, [slides.length, activeIndex]);

    // 3. AUTOPLAY EFFECT
    useEffect(() => {
        if (!autoPlay || isAnimating || loading || slides.length <= 1) return;
        const timer = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, interval);
        return () => clearTimeout(timer);
    }, [activeIndex, autoPlay, isAnimating, loading, interval, slides.length]);

    const hasCustomHeight = className.includes("h-");

    return (
        <div className={`relative w-full ${hasCustomHeight ? "" : "h-screen"} bg-[#0a0a0a] overflow-hidden ${className}`}>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes sliderLoading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            ` }} />

            {/* Initial Loading Screen */}
            <div className={`absolute inset-0 z-10 bg-[#0A0910] flex items-center justify-center transition-opacity duration-700 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="w-12 h-px bg-white/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white animate-[sliderLoading_1.5s_infinite]" />
                </div>
            </div>

            {/* Main Stage: Pure Visual Canvas with ZERO Text */}
            <main className="relative w-full h-full flex flex-col justify-end">
                <div ref={mountRef} className="absolute inset-0 z-0" />

                {/* Sleek Minimalist Line Indicators (No Text/Numbers) */}
                {showPagination && (
                    <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 z-20 flex flex-col gap-3 sm:gap-4">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className="group flex items-center justify-end py-1.5 px-1 outline-none cursor-pointer"
                                disabled={isAnimating}
                                aria-label={`Slide ${i + 1}`}
                            >
                                <div
                                    className={`h-[3px] rounded-full transition-all duration-500 ${
                                        activeIndex === i
                                            ? "w-10 sm:w-14 shadow-lg"
                                            : "w-3 sm:w-4 bg-white/35 group-hover:bg-white/70"
                                    }`}
                                    style={{
                                        backgroundColor: activeIndex === i ? (accentColor || "#ffffff") : undefined
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
