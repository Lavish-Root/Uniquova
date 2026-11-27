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
    vec2 cUv = getFittedUv(vUv, currentAspect, containerAspect, fitMode);
    vec2 nUv = getFittedUv(vUv, nextAspect, containerAspect, fitMode);

    // Aspect-corrected vector from center so the water droplet ripple is circular
    vec2 p = vUv - vec2(0.5);
    p.x *= containerAspect;
    float maxR = length(vec2(0.5 * containerAspect, 0.5));
    float r = length(p) / max(maxR, 0.0001);
    vec2 dir = length(p) > 0.0001 ? normalize(p) : vec2(0.0);

    // Expanding droplet wavefront
    float progress = clamp(dispFactor, 0.0, 1.0);
    float waveCenter = progress * 1.24 - 0.12;
    float distToWave = r - waveCenter;

    // Smooth, organic water ripple rings around the expanding droplet edge
    float envelope = exp(-pow(distToWave * 4.5, 2.0));
    float activeWindow = sin(progress * 3.14159265);
    float ripple = sin(distToWave * 24.0 - progress * 5.0) * envelope * activeWindow;

    // Refract UVs radially like a smooth water droplet surface
    vec2 refraction = dir * (ripple * 0.04);
    vec4 _currentImage = sampleFitted(currentImage, cUv - refraction, fitMode);
    vec4 _nextImage = sampleFitted(nextImage, nUv + refraction * 0.85, fitMode);

    // Silky radial droplet reveal from center outward
    float mask = smoothstep(waveCenter + 0.14, waveCenter - 0.14, r);
    // Ensure clean 0 -> 1 endpoints at start/end of transition
    mask = mix(mask, 1.0, smoothstep(0.92, 1.0, progress));
    mask = mix(0.0, mask, smoothstep(0.0, 0.08, progress));

    vec4 color = mix(_currentImage, _nextImage, mask);

    // Subtle specular water crest highlight along the droplet ring
    float crest = max(0.0, ripple) * 0.10;
    color.rgb += vec3(crest * 0.92, crest * 0.95, crest * 1.05) * color.a;

    gl_FragColor = color;
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

    const slidesKey = slides.map((s) => s.image).join("|");

    // 1. INITIALIZATION & TEXTURE LOADING
    useEffect(() => {
        if (isExternalLoading) {
            setLoading(true);
            return;
        }

        if (!mountRef.current || !slides.length) {
            setLoading(false);
            return;
        }

        let isCancelled = false;
        setLoading(true);
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
            if (material.uniforms.nextImage.value) {
                material.uniforms.currentImage.value = material.uniforms.nextImage.value;
                material.uniforms.currentAspect.value = material.uniforms.nextAspect.value;
                material.uniforms.dispFactor.value = 0.0;
            }
        }

        const nextAsp = getTextureAspect(nextTexture);
        onAspectRatioChangeRef.current?.(nextAsp);
        material.uniforms.nextImage.value = nextTexture;
        material.uniforms.nextAspect.value = nextAsp;
        material.uniforms.dispFactor.value = 0.0;

        // Smooth, unhurried WebGL Water Droplet Transition
        tweenRef.current = gsap.to(material.uniforms.dispFactor, {
            duration: 1.5,
            value: 1,
            ease: "sine.inOut",
            onComplete: () => {
                if (materialRef.current === material) {
                    material.uniforms.currentImage.value = nextTexture;
                    material.uniforms.currentAspect.value = nextAsp;
                    material.uniforms.dispFactor.value = 0.0;
                    currentIndexRef.current = activeIndex;
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

    // 3. AUTOPLAY EFFECT (continues automatically, resets timer whenever user clicks)
    useEffect(() => {
        if (!autoPlay || loading || slides.length <= 1) return;
        const timer = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, interval);
        return () => clearTimeout(timer);
    }, [activeIndex, autoPlay, loading, interval, slides.length]);

    const handleNextSlide = () => {
        if (loading || slides.length <= 1) return;
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    const hasCustomHeight = className.includes("h-");

    return (
        <div 
            onClick={handleNextSlide}
            role="button"
            tabIndex={0}
            aria-label="Click to advance to next showcase image"
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleNextSlide();
                }
            }}
            className={`relative w-full ${hasCustomHeight ? "" : "h-screen"} bg-[#0a0a0a] overflow-hidden cursor-pointer select-none ${className}`}
        >
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

            {/* Main Stage: Pure Visual Canvas with ZERO Text or Line Overlays */}
            <main className="relative w-full h-full flex flex-col justify-end">
                <div ref={mountRef} className="absolute inset-0 z-0" />
            </main>
        </div>
    );
}
