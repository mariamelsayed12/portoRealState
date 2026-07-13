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
    <article className="relative h-[220px] sm:h-[253px] w-full overflow-hidden rounded-[12px] border border-border bg-white pt-[24px] px-[24px]">
      <div className="relative z-10 flex flex-col gap-[20px] items-start text-center w-full leading-[normal]">
        <h3 className="text-[16px] sm:text-[19px] font-medium text-[#141414] w-full font-['Poppins']">
          {card.title}
        </h3>
        <p className="text-[14px] sm:text-[16px] font-normal text-[#464646] w-full font-['Poppins']">
          {card.description}
        </p>
      </div>

      <WaveFooter variant={waveVariant} />
    </article>
  );
};

const InvestmentImageCard = ({ card }: { card: InvestmentCardData }) => {
  return (
    <article className="relative h-[300px] sm:h-[400px] md:h-[530px] w-full overflow-hidden rounded-[12px] bg-white">
      <Image
        imageurl={card.image ?? ""}
        alt={card.alt ?? card.title}
        className="absolute inset-0 h-full w-full object-cover object-center rounded-[12px]"
      />
    </article>
  );
};

const NorthCoastInvestmentSection = () => {
  const [leftTop, leftBottom, featured, rightTop, rightBottom] = northCoastInvestmentCards;

  return (
    <section className="w-full bg-background py-[60px] px-6 sm:px-12 md:px-16 lg:px-[120px]">
      <div className="mx-auto w-full flex flex-col gap-[24px]">
        <h2 className="text-[#141414] font-medium text-[28px] md:text-[40px] tracking-tight leading-[normal] font-['Poppins']">
          {northCoastHeading.title}
        </h2>

        <div className="grid gap-[24px] md:grid-cols-3 md:items-stretch">
          <div className="flex flex-col gap-[24px] justify-center">
            {leftTop && <InvestmentTextCard card={leftTop} waveVariant={0} />}
            {leftBottom && <InvestmentTextCard card={leftBottom} waveVariant={1} />}
          </div>

          {featured && <InvestmentImageCard card={featured} />}

          <div className="flex flex-col gap-[24px] justify-center">
            {rightTop && <InvestmentTextCard card={rightTop} waveVariant={3} />}
            {rightBottom && <InvestmentTextCard card={rightBottom} waveVariant={2} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NorthCoastInvestmentSection;