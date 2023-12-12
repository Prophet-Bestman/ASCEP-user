import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/utils/helper";
import {
  AddSquare,
  CloseCircle,
  Dislike,
  Flag,
  Like1,
  MinusSquare,
} from "iconsax-react";
import { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { commentSchema } from "@/schemas/DebateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { usePublishComment } from "@/api/democracy/debates";
import { FormInput } from "..";
import { IconWrapper } from "@/components/custom";
import { useClickAway } from "@uidotdev/usehooks";

interface DebateCommentResponseProps {
  response: DebateCommentResponseType;
  paddingLeft: number;
}
const DebateCommentResponse: React.FC<DebateCommentResponseProps> = ({
  response,
  paddingLeft,
}) => {
  const { mutateAsync: publishResponse, isLoading: isPublishingComment } =
    usePublishComment();
  const { debateId } = useParams();
  const [showResponse, setShowResponse] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const ref = useClickAway<HTMLDivElement>(() => {
    setTimeout(() => {
      setIsReplying(false);
      setShowResponse(false);
    }, 500);
  });
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      debate_id: parseInt(debateId!),
      comment_reference: response.response_id,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    await publishResponse(values);
    closeResponse();
  }

  const closeResponse = () => {
    reset();
    setIsReplying(false);
  };

  return (
    <>
      <div ref={ref}>
        <div className=" border-t-2 border-base-500 mt-2" />
        <div
          className={`pl-[${paddingLeft}px]`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <div className="flex justify-start items-center gap-6 my-4 flex-wrap pt-2 ">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/avatar.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="text-dark text-[14px] -ml-4">Dexter Olaniyi</h2>
            <p className="text-[12px] text-base-400 my-3 ">2023-10-28</p>
          </div>
          <p className=" pb-2 text-base-500">
            {response.commentDetail.content}
          </p>

          {/* FOOTER */}
          <div className="flex justify-between items-center flex-wrap-reverse gap-2">
            <div className="flex justify-start  gap-2 items-center pt-4 flex-wrap">
              <Button
                className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px]"
                onClick={() => setShowResponse(!showResponse)}
              >
                {showResponse ? (
                  <MinusSquare size={25} />
                ) : (
                  <AddSquare size={25} />
                )}
                <span>
                  {response.commentDetail?.responses?.length} responses
                </span>
              </Button>

              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />

              <Button
                className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]"
                onClick={() => setIsReplying(true)}
              >
                Reply
              </Button>

              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />

              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                <Flag size="25" />
              </Button>

              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />
              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                Hide
              </Button>
              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />
              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                Block Author
              </Button>
            </div>

            <div className="flex justify-start items-center  gap-2 pt-4">
              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                13 Votes
              </Button>
              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />
              <Button className="text-[#31D0AA] gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                <Like1 variant="Bold" /> <span>10</span>
              </Button>
              <Button className="text-[#E43F40] gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                <Dislike variant="Bold" /> <span>3</span>
              </Button>
            </div>
          </div>

          {/* REPLY INPUT */}
          {isReplying && (
            <div>
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormInput
                    label="Leave a response"
                    control={control}
                    name="content"
                    errors={errors}
                    className="h-8 focus-visible:ring-primary focus-visible:ring-1 rounded-full focus-visible:ring-offset-0"
                  />

                  <div className="flex justify-between items-center">
                    <Button
                      type="submit"
                      className="w-fit h-fit text-[12px] font-[500]"
                      isLoading={isPublishingComment}
                    >
                      Publish response
                    </Button>
                    <IconWrapper
                      className="text-dark p-0 cursor-pointer"
                      onClick={closeResponse}
                    >
                      <CloseCircle size={20} />
                    </IconWrapper>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>

        <div
          className={` ${
            showResponse ? "" : "h-0  overflow-hidden"
          } duration-300`}
        >
          {response?.commentDetail?.responses?.map((response) => (
            <DebateCommentResponse
              key={response.response_id}
              response={response}
              paddingLeft={paddingLeft + 20}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DebateCommentResponse;