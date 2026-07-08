import { northCoastHeading, northCoastInvestmentCards } from "../../data";
import type { InvestmentCardData } from "../../interfaces";
import Image from "../Ui/Image";

const waveVariants = [
  {
    viewBox: "0 0 384 91",
    heightClass: "h-[91px]",
    d: "M0 40.4444L16 47.1852C32 53.9259 64 67.4074 96 65.7222C128 64.037 160 47.1852 192 45.5C224 43.8148 256 57.2963 288 52.2407C320 47.1852 352 23.5926 368 11.7963L384 0V91H368C352 91 320 91 288 91C256 91 224 91 192 91C160 91 128 91 96 91C64 91 32 91 16 91H0V40.4444Z",
  },
  {
    viewBox: "0 0 384 91",
    heightClass: "h-[91px]",
    d: "M0 56.2296L9.28 60.093C18.24 63.9564 36.48 71.6831 54.72 65.888C73.28 60.093 91.52 40.7761 109.76 25.3226C128 9.86907 146.24 -1.72106 164.48 0.210628C182.72 2.14232 201.28 17.5958 219.52 21.4592C237.76 25.3226 256 17.5958 274.24 9.86907C292.48 2.14232 310.72 -5.58444 329.28 6.00569C347.52 17.5958 365.76 48.5028 374.72 63.9564L384 79.4099V91H374.72C365.76 91 347.52 91 329.28 91C310.72 91 292.48 91 274.24 91C256 91 237.76 91 219.52 91C201.28 91 182.72 91 164.48 91C146.24 91 128 91 109.76 91C91.52 91 73.28 91 54.72 91C36.48 91 18.24 91 9.28 91H0V56.2296Z",
  },
  {
    viewBox: "0 0 384 91",
    heightClass: "h-[91px]",
    d: "M0 40.4444L16 47.1852C32 53.9259 64 67.4074 96 65.7222C128 64.037 160 47.1852 192 45.5C224 43.8148 256 57.2963 288 52.2407C320 47.1852 352 23.5926 368 11.7963L384 0V91H368C352 91 320 91 288 91C256 91 224 91 192 91C160 91 128 91 96 91C64 91 32 91 16 91H0V40.4444Z",
  },
  {
    viewBox: "0 0 384 81",
    heightClass: "h-[81px]",
    d: "M0 0L16 1.92857C32 3.85714 64 7.71429 96 19.2857C128 30.8571 160 50.1429 192 44.3571C224 38.5714 256 7.71429 288 1.92857C320 -3.85714 352 15.4286 368 25.0714L384 34.7143V81H368C352 81 320 81 288 81C256 81 224 81 192 81C160 81 128 81 96 81C64 81 32 81 16 81H0V0Z",
  },
] as const;

const WaveFooter = ({ variant }: { variant: number }) => {
  const wave = waveVariants[variant] ?? waveVariants[0];

  return (
    <svg
      className={`absolute inset-x-0 bottom-0 w-full text-secondary ${wave.heightClass}`}
      viewBox={wave.viewBox}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d={wave.d}
      />
    </svg>
  );
};

const InvestmentTextCard = ({ card, waveVariant }: { card: InvestmentCardData; waveVariant: number }) => {
  return (
    <article className="relative min-h-[185px] overflow-hidden rounded-[12px] border border-[#E1E8EB] bg-white px-4 py-4">
      <div className="relative z-10 flex h-full flex-col items-center text-center">
        <h3
          className="max-w-[200px] text-[19px] font-medium text-text-secondary"
        >
          {card.title}
        </h3>
        <p className="mt-2 max-w-[178px] text-[10px] leading-relaxed text-[#66767D]">
          {card.description}
        </p>
      </div>

      <WaveFooter variant={waveVariant} />
    </article>
  );
};

const InvestmentImageCard = ({ card }: { card: InvestmentCardData }) => {
  return (
    <article className="relative min-h-[334px] overflow-hidden rounded-[12px] border border-[#E1E8EB] bg-white md:min-h-[334px]">
      <Image
        imageurl={card.image ?? ""}
        alt={card.alt ?? card.title}
        className="h-full w-full object-cover object-center"
      />
    </article>
  );
};

const NorthCoastInvestmentSection = () => {
  const [leftTop, leftBottom, featured, rightTop, rightBottom] = northCoastInvestmentCards;

  return (
    <section className="bg-background py-4 pb-14 sm:pb-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <h2 className="mb-4 text-[22px] font-semibold tracking-tight text-text-secondary sm:text-[24px]">
          {northCoastHeading.title}
        </h2>

        <div className="grid gap-4 md:grid-cols-[1fr_1.18fr_1fr] md:items-stretch">
          <div className="grid gap-4">
            {leftTop && <InvestmentTextCard card={leftTop} waveVariant={0} />}
            {leftBottom && <InvestmentTextCard card={leftBottom} waveVariant={1} />}
          </div>

          {featured && <InvestmentImageCard card={featured} />}

          <div className="grid gap-4">
            {rightTop && <InvestmentTextCard card={rightTop} waveVariant={3} />}
            {rightBottom && <InvestmentTextCard card={rightBottom} waveVariant={2} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NorthCoastInvestmentSection;