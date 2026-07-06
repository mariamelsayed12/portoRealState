import { northCoastHeading, northCoastInvestmentCards } from "../../data";
import type { InvestmentCardData } from "../../interfaces";
import Image from "../Ui/Image";

const waveBg = "absolute inset-x-0 bottom-0 h-16 bg-secondary/70 opacity-90";

const InvestmentTextCard = ({ card }: { card: InvestmentCardData }) => {
  return (
    <article className="relative min-h-[158px] overflow-hidden rounded-[12px] border border-[#E1E8EB] bg-white px-4 py-4 shadow-[0_2px_10px_rgba(73,95,104,0.05)]">
      <div className="relative z-10 flex h-full flex-col items-center text-center">
        <h3 className="max-w-[170px] text-[13px] font-semibold leading-tight text-text-darker">
          {card.title}
        </h3>
        <p className="mt-2 max-w-[178px] text-[10px] leading-relaxed text-[#66767D]">
          {card.description}
        </p>
      </div>

      <div className={waveBg} />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/70 to-transparent" />
    </article>
  );
};

const InvestmentImageCard = ({ card }: { card: InvestmentCardData }) => {
  return (
    <article className="relative min-h-[334px] overflow-hidden rounded-[12px] border border-[#E1E8EB] bg-white shadow-[0_2px_10px_rgba(73,95,104,0.06)] md:min-h-[334px]">
      <Image
        imageurl={card.image ?? ""}
        alt={card.alt ?? card.title}
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
    </article>
  );
};

const NorthCoastInvestmentSection = () => {
  const [leftTop, leftBottom, featured, rightTop, rightBottom] = northCoastInvestmentCards;

  return (
    <section className="bg-background py-4 pb-14 sm:pb-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <h2 className="mb-4 text-[22px] font-semibold tracking-tight text-text-darker sm:text-[24px]">
          {northCoastHeading.title}
        </h2>

        <div className="grid gap-4 md:grid-cols-[1fr_1.18fr_1fr] md:items-stretch">
          <div className="grid gap-4">
            {leftTop && <InvestmentTextCard card={leftTop} />}
            {leftBottom && <InvestmentTextCard card={leftBottom} />}
          </div>

          {featured && <InvestmentImageCard card={featured} />}

          <div className="grid gap-4">
            {rightTop && <InvestmentTextCard card={rightTop} />}
            {rightBottom && <InvestmentTextCard card={rightBottom} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NorthCoastInvestmentSection;