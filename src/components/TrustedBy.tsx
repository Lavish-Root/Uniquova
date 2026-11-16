import React from "react";

export default function TrustedBy() {
  const platforms = [
    {
      name: "PraanSewa",
      svg: (
        <div className="flex items-center hover:opacity-80 transition-opacity shrink-0">
          <img
            src="/images/clients/praansewa.png"
            alt="PraanSewa — Healthcare &amp; Wellness Partner of UNIQUOVA"
            width={120}
            height={32}
            loading="lazy"
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </div>
      ),
    },
    {
      name: "VERASTRA",
      svg: (
        <div className="flex items-center hover:scale-105 transition-transform shrink-0">
          <img
            src="/images/clients/verastra_clean.png"
            alt="VERASTRA — High-Growth D2C Brand Scaled by UNIQUOVA"
            width={130}
            height={36}
            loading="lazy"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </div>
      ),
    },
    {
      name: "Syaahi",
      svg: (
        <div className="flex items-center hover:opacity-85 transition-opacity shrink-0">
          <img
            src="/images/clients/syaahi.png"
            alt="Syaahi — Lifestyle &amp; Design Client Partner of UNIQUOVA"
            width={100}
            height={28}
            loading="lazy"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </div>
      ),
    },
    {
      name: "CloudGuard AI",
      svg: (
        <div className="flex items-center hover:scale-105 transition-transform shrink-0">
          <img
            src="/images/clients/cloudguard.png"
            alt="CloudGuard AI — Enterprise Software Partner of UNIQUOVA"
            width={140}
            height={36}
            loading="lazy"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </div>
      ),
    },
    {
      name: "Loopago",
      svg: (
        <div className="flex items-center hover:opacity-85 transition-opacity shrink-0">
          <img
            src="/images/clients/loopago.png"
            alt="Loopago — Digital Logistics Partner of UNIQUOVA"
            width={110}
            height={28}
            loading="lazy"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </div>
      ),
    },
    {
      name: "Amazon",
      svg: (
        <div className="flex items-center shrink-0">
          <svg
            viewBox="0 0 100 30"
            className="h-6 w-auto fill-current text-dark hover:text-[#FF9900] transition-colors"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="0"
              y="18"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="bold"
              fontSize="18"
              letterSpacing="-0.5"
              fill="currentColor"
            >
              amazon
            </text>
            <path
              d="M 8 23 Q 32 29 54 23"
              stroke="#FF9900"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 51 21 L 56 23 L 53 26 Z"
              fill="#FF9900"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Flipkart",
      svg: (
        <div className="flex items-center hover:opacity-90 transition-opacity shrink-0">
          <img
            src="/images/clients/flipkart_clean.svg"
            alt="Flipkart — Marketplace Partner Channel Managed by UNIQUOVA"
            width={120}
            height={28}
            loading="lazy"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </div>
      ),
    },
    {
      name: "Meesho",
      svg: (
        <div className="flex items-center hover:opacity-90 transition-opacity shrink-0">
          <img
            src="/images/clients/meesho.png"
            alt="Meesho — Social Commerce Marketplace Integration by UNIQUOVA"
            width={120}
            height={32}
            loading="lazy"
            className="h-7 sm:h-8 w-auto object-contain rounded-xl shadow-xs"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-6 lg:mt-10">
      {/* Scoped CSS animation for smooth Left-to-Right motion */}
      <style>{`
        @keyframes marqueeLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left-to-right {
          animation: marqueeLeftToRight 30s linear infinite !important;
          will-change: transform;
        }
        .animate-marquee-left-to-right:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="bg-white/95 backdrop-blur-xl border border-border/80 shadow-[0_10px_35px_rgba(117,69,245,0.06)] rounded-2xl sm:rounded-full px-5 sm:px-7 py-3 sm:py-3.5 flex flex-col md:flex-row items-center gap-5 sm:gap-6 overflow-hidden">
        {/* Left Badge: Trusted By / Leading brands & businesses */}
        <div className="flex items-center gap-3 shrink-0 z-10 bg-white/95 pr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-extrabold text-dark tracking-tight leading-none whitespace-nowrap">
              Trusted By
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-dark-muted leading-tight mt-0.5 whitespace-nowrap">
              Leading brands &amp; businesses
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-8 bg-border/80 shrink-0 z-10" />

        {/* Marquee Track Container with gradient fade edges */}
        <div className="relative w-full overflow-hidden flex-1 py-1">
          {/* Subtle fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Continuous Moving Track: from Left to Right */}
          <div className="flex w-max items-center space-x-8 sm:space-x-10 animate-marquee-left-to-right">
            {[...platforms, ...platforms, ...platforms, ...platforms].map((p, idx) => (
              <div
                key={`${p.name}-${idx}`}
                className="shrink-0 transition-transform duration-200 hover:scale-105"
                title={p.name}
              >
                {p.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
