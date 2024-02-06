import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CloseCircle } from "iconsax-react";
import { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  CommentCardFooter,
  CommentCardHeader,
  FormInput,
  VoteCommentButtons,
} from "..";
import { IconWrapper } from "@/components/custom";
import { useClickAway } from "@uidotdev/usehooks";
import {
  useGetInitiativeCommentResponses,
  usePublishInitiativeComment,
  useVoteInitiativeComment,
} from "@/api/democracy/initiatives";
import { initiativeCommentSchema } from "@/schemas/InitiativesSchema";

interface InitiativeCommentResponseProps {
  response: CommentType;
  paddingLeft: number;
  refetchParentResponses: () => void;
}
const InitiativeCommentResponse: React.FC<InitiativeCommentResponseProps> = ({
  response,
  paddingLeft,
  refetchParentResponses,
}) => {
  const { initiativeId } = useParams();

  const { mutateAsync: publishResponse, isLoading: isPublishingComment } =
    usePublishInitiativeComment();

  const { mutateAsync: voteComment, isLoading: isVotingComment } =
    useVoteInitiativeComment();

  const [showResponse, setShowResponse] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: Data,
    isRefetching: isLoadingResponses,
    refetch: getResponses,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInitiativeCommentResponses(response.id);

  const ref = useClickAway<HTMLDivElement>(() => {
    setTimeout(() => {
      setIsReplying(false);
      setShowResponse(false);
    }, 500);
  });

  const form = useForm<z.infer<typeof initiativeCommentSchema>>({
    resolver: zodResolver(initiativeCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      initiative_id: "",
      comment_reference: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof initiativeCommentSchema>) {
    await publishResponse({
      ...values,
      initiative_id: initiativeId!,
      comment_reference: response.id,
    });
    refetchParentResponses();
    closeResponse();
  }

  const closeResponse = () => {
    reset();
    setIsReplying(false);
  };

  const fetchResponse = async () => {
    setLoading(true);
    setIsReplying(false);
    await getResponses();
    setLoading(false);
    setShowResponse(true);
  };

  const handleLike = async () => {
    await voteComment({ type: "like", comment_id: response.id });
    refetchParentResponses();
  };
  const handleDislike = async () => {
    await voteComment({ type: "dislike", comment_id: response.id });
    refetchParentResponses();
  };

  return (
    <>
      <div ref={ref}>
        <Separator orientation="horizontal" className="bg-base-500" />
        <div
          className={`pl-[${paddingLeft}px]`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <CommentCardHeader
            username={response.author.username}
            content={response.content}
            createdAt={response.createdAt}
            profilePicture={response.author.profile_picture}
          />
          {/* FOOTER */}
          <div className="flex justify-between items-center flex-wrap-reverse gap-2">
            <CommentCardFooter
              numberOfResponses={response.comment_response_cache}
              setIsReplying={setIsReplying}
              setShowResponse={setShowResponse}
              showResponse={showResponse}
              fetchResponse={fetchResponse}
              isLoadingResponses={isLoadingResponses}
              loading={loading}
            />

            <VoteCommentButtons
              dislikeComment={handleDislike}
              likeComment={handleLike}
              dislikes={response.dislikes}
              isVoting={isVotingComment}
              likes={response.likes}
              reactionType={response.userVoted.reactionType}
            />
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
                      className="w-full max-w-[200px] h-10"
                      isLoading={isPublishingComment}
                      disabled={isPublishingComment}
                    >
                      Publish Comment
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

        {Data && (
          <div
            className={`${showResponse ? "" : "h-0  overflow-hidden"} ${
              isLoadingResponses && "opacity-50 pointer-events-none"
            }`}
          >
            {Data?.pages.map((commentsData, i) => (
              <div key={i}>
                {commentsData.comments.map((response) => (
                  <InitiativeCommentResponse
                    key={response.id}
                    response={response}
                    paddingLeft={paddingLeft + 30}
                    refetchParentResponses={getResponses}
                  />
                ))}
              </div>
            ))}
            {Data?.pages[Data.pages.length - 1].meta.next_page_url && (
              <Button
                className="w-full h-fit bg-transparent py-4 hover:bg-transparent -mb-5"
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                Load more
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InitiativeCommentResponse;
