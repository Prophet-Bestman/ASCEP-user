import { frontendURL } from "@/api/baseUrl";
import { Share } from "@/components/Democracy";
import {
  RequestInfoAccordionList,
  RequestInfoHeader,
} from "@/components/Dialogue";
import { Button } from "@/components/ui/button";
import { ArrowCircleDown2 } from "iconsax-react";

interface RequestInfoPageProp {}
const RequestInfoPage: React.FC<RequestInfoPageProp> = () => {
  return (
    <div className="flex justify-start gap-10 xl:flex-row flex-col">
      <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
        <RequestInfoHeader />
        <RequestInfoAccordionList />
      </div>

      <div className="w-full  md:w-[300px] space-y-10">
        <div>
          <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
            Author
          </h2>
          <Button
            className="text-dark text-base h-fit my-4 px-8 py-3 w-full justify-center
               gap-3 flex rounded-lg max-w-[220px]"
          >
            <span>Action</span>
            <ArrowCircleDown2 size={25} />
          </Button>
        </div>

        {/* SHARE */}
        <Share shareableURL={frontendURL + `/democracy/share/`} />
        <div>
          <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
            Follow
          </h2>
          <Button className="bg-transparent border border-primary mt-3 text-primary hover:text-light w-full max-w-[220px]">
            Follow Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestInfoPage;