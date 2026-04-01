import oxfordLogo from "@/assets/partners/oxford.png";
import solsticeLogo from "@/assets/partners/solstice.png";
import dwsLogo from "@/assets/partners/dws.png";
import vanguardLogo from "@/assets/partners/vanguard.png";
import ictDublinLogo from "@/assets/partners/ict-dublin.png";
import cognismLogo from "@/assets/partners/cognism.png";
import corprimeLogo from "@/assets/partners/corprime.png";
import deusxLogo from "@/assets/partners/deusx.png";
import nvidiaLogo from "@/assets/partners/nvidia-inception.png";
import consensysLogo from "@/assets/partners/consensys.png";

const partners = [
  { src: oxfordLogo, alt: "University of Oxford" },
  { src: solsticeLogo, alt: "Solstice" },
  { src: dwsLogo, alt: "DWS" },
  { src: vanguardLogo, alt: "Vanguard" },
  { src: ictDublinLogo, alt: "ICT Services Dublin" },
  { src: cognismLogo, alt: "Cognism" },
  { src: corprimeLogo, alt: "CorPrime" },
  { src: deusxLogo, alt: "Deus X" },
  { src: nvidiaLogo, alt: "NVIDIA Inception Program" },
  { src: consensysLogo, alt: "ConsenSys" },
];

const PartnerLogoBanner = () => {
  return (
    <div className="border-b border-border overflow-hidden">
      <div className="py-12">
        <p className="mb-10 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40">
          Trusted By
        </p>
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

          {/* Scrolling track */}
          <div className="flex animate-marquee items-center gap-16">
            {[...partners, ...partners].map((partner, i) => (
              <img
                key={`${partner.alt}-${i}`}
                src={partner.src}
                alt={partner.alt}
                className="h-8 w-auto flex-shrink-0 object-contain opacity-60 brightness-0 invert transition-opacity duration-300 hover:opacity-100 md:h-10"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogoBanner;
