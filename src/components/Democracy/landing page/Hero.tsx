import { DemocracyNavigation } from "@/components/Democracy";
import HeroImage from "/images/democracy/hero-image.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { useAuthContext } from "@/providers/AuthProvider";

interface HeroProp {}
const Hero: React.FC<HeroProp> = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="w-full relative px-3 min-[600px]:px-6 pt-10 pb-16">
      <DemocracyNavigation />
      <img
        src={HeroImage}
        alt="Hero-Image"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 grayscale"
      />
      <h1 className="text-light text-center text-5xl lg:text-7xl py-16 ">
        Decide how to shape <br />
        <span className="text-primary py-5 leading-[60px]">
          the City you want to Live in
        </span>
      </h1>
      <p className="text-light text-center text-xl md:text-2xl">
        Vote, contribute, Initiate, build and Participate in Ideas that shape
        the future
      </p>

      {!isLoggedIn && (
        <div className="flex justify-center items-center gap-8 md:flex-row w-full flex-wrap my-6">
          <Button className="w-[175px]">Get started</Button>
          <Link to={ROUTES.SIGNIN_ROUTE}>
            <Button className="bg-transparent border-primary border-2 w-[175px]">
              Log in
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Hero;