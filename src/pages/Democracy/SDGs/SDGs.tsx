import { IconWrapper } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/contexts/AppContext";
import ROUTES from "@/utils/routesNames";
import { Chart, Scanning, SearchFavorite1 } from "iconsax-react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SDGProps {}
const SDGHomePage: React.FC<SDGProps> = () => {
  const { sdgData, fetchingSdgs } = useAppContext();

  return (
    <>
      {/* HEADING */}
      <div className="max-w-[900px]">
        <div className="flex gap-2 items-center ">
          <img src="/images/SDG/sdg-logo.png" alt="sdg-logo" />
          <h1 className="text-[40px] lg:text-[60px]">SDGs</h1>
        </div>
        <h1 className="capitalize text-primary text-[40px] lg:text-[60px] text-dark">
          Sustainable development goals
        </h1>

        <h3 className="text-[20px] lg:text-[24px] my-3 text-dark">
          What are the Sustainable Development Goals?
        </h3>
        <p className="text-justify text-subtle_text">
          The Sustainable Development Goals (SDGs), also known as the Global
          Goals, were adopted by the United Nations in 2015 as a universal call
          to action to end poverty, protect the planet, and ensure that by 2030
          all people enjoy peace and prosperity. <br />
          The 17 SDGs are integrated—they recognize that action in one area will
          affect outcomes in others, and that development must balance social,
          economic and environmental sustainability.
          <br /> Countries have committed to prioritize progress for those
          who're furthest behind. The SDGs are designed to end poverty, hunger,
          AIDS, and discrimination against women and girls.
          <br /> The creativity, knowhow, technology and financial resources
          from all of society is necessary to achieve the SDGs in every context.
        </p>
      </div>

      <div className="my-8">
        <h3 className="text-xl lg:text-3xl  ">
          The Sustainable Development Goals
        </h3>
        {fetchingSdgs && (
          <div className="flex items-center gap-2">
            <Skeleton className="!bg-clip-content bg-transparent">
              <p className="text-text">Loading SDGs</p>
            </Skeleton>
            <IconWrapper className=" text-primary bg-transparent my-10 w-fit h-fit rounded-full">
              <FaSpinner className="animate-spin text-[30px]" />
            </IconWrapper>
          </div>
        )}
        <div className="flex flex-wrap justify-start items-start gap-4  w-fit mt-5 max-w-[900px]">
          {sdgData.map((sdg) => (
            <Link to={ROUTES.SDGs_DETAILS_ROUTE} state={{ sdg }} key={sdg.id}>
              <Button className="bg-transparent h-fit w-fit md:h-[60px] md:w-[60px] p-0 hover:bg-transparent rounded-md overflow-hidden">
                <img
                  src={sdg.banner}
                  alt={sdg.description}
                  className="w-full h-full"
                />
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-10 grid-cols-1 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-3 py-10 max-w-[900px]">
        <div className="flex flex-col justify-between items-center gap-[19px] w-full max-w-[400px] mx-auto">
          <IconWrapper className="w-[135px] h-[135px] rounded-xl bg-light text-subtle_text shadow-xl">
            <SearchFavorite1 size="60" variant="Bold" />
          </IconWrapper>
          <div>
            <h3 className="text-[20px] md:text-[32px] text-dark text-center">
              Sensitization
            </h3>
            <p className="text-[14px] p-0 md:text-[18px] text-center text-subtle_text">
              What is your Proposal?
            </p>
          </div>
          <p className="text-[14px] md:text-[18px] text-center text-subtle_text">
            Submit a proposal. Organize a community around your proposal, find
            the support and when you have enough support, your proposal will be
            debated in the municipal plenary.
          </p>
          <Button className="bg-dark text-light">Make a Proposal</Button>
        </div>
        <div className="flex flex-col justify-between items-center gap-[19px] w-full max-w-[400px] mx-auto">
          <IconWrapper className="w-[135px] h-[135px] rounded-xl bg-light text-subtle_text shadow-xl">
            <Chart size="60" variant="Bold" />
          </IconWrapper>
          <div>
            <h3 className="text-[20px] md:text-[32px] text-dark text-center">
              Planning
            </h3>
            <p className="text-[14px] p-0 md:text-[18px] text-center text-subtle_text">
              The City you want
            </p>
          </div>
          <p className="text-[14px] md:text-[18px] text-center text-subtle_text">
            Prioritization of different aspects of the city's development.
            participate by engaging in polls and votes that matters to a better
            place
          </p>
          <Button className="bg-dark text-light">Participate</Button>
        </div>

        <div className="flex flex-col justify-between items-center gap-[19px] w-full max-w-[400px] mx-auto">
          <IconWrapper className="w-[135px] h-[135px] rounded-xl bg-light text-subtle_text shadow-xl">
            <Scanning size="60" variant="Bold" />
          </IconWrapper>
          <div>
            <h3 className="text-[20px] md:text-[32px] text-dark text-center">
              Monitoring
            </h3>
            <p className="text-[14px] p-0 md:text-[18px] text-center text-subtle_text">
              Comment the plan for a safe environment
            </p>
          </div>
          <p className="text-[14px] md:text-[18px] text-center text-subtle_text">
            Inform yourself and comment on the proposal about the plan for a
            100% green city
          </p>
          <Button className="bg-dark text-light">See comments</Button>
        </div>
      </div>
    </>
  );
};

export default SDGHomePage;
