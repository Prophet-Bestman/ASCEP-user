import { IconWrapper, PageLoader, Pagination } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import ROUTES from "@/utils/routesNames";
import { CloseCircle, Danger } from "iconsax-react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import {
  FilterButtons,
  FormInput,
  LoginSigninPrompt,
  PollCommentCard,
} from "..";
import { commentFilterButtonOptions } from "@/utils/Democracy/General";
import {
  useGetPollComments,
  usePublishPollComment,
} from "@/api/democracy/voting";
import { useEffect, useState } from "react";
import { pollCommentSchema } from "@/schemas/VotingSchema";

interface PollCommentSectionProp {}
const PollCommentSection: React.FC<PollCommentSectionProp> = () => {
  const { isLoggedIn } = useAuthContext();
  const { pollId } = useParams();

  const { mutateAsync: publishComment, isLoading: isPublishingComment } =
    usePublishPollComment();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    refetch,
    isFetching: isFetchingComments,
  } = useGetPollComments(pollId!, page, filter);

  const form = useForm<z.infer<typeof pollCommentSchema>>({
    resolver: zodResolver(pollCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      voting_id: pollId!,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof pollCommentSchema>) {
    await publishComment(values);
    if (commentsData) {
      reset();
    }
  }
  useEffect(() => {
    refetch();
  }, [page, filter]);

  return (
    <>
      {/*COMMENTS */}
      <div className="w-full">
        <h2 className="pb-2 mb-4 pt-0 pl-0 border-b-4 text-lg text-text font-medium border-primary w-fit">
          Comments
        </h2>
      </div>
      {!isLoggedIn ? (
        <LoginSigninPrompt />
      ) : (
        <div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 max-w-[900px]"
            >
              <FormInput
                label="Leave a comment"
                control={control}
                name="content"
                errors={errors}
              />

              <Button
                type="submit"
                className="w-full max-w-[200px] h-12"
                isLoading={isPublishingComment}
                disabled={isPublishingComment}
              >
                Publish Comment
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* FILTER BUTTONS */}
      <div className="my-8">
        <FilterButtons
          filterButtonOptions={commentFilterButtonOptions}
          filterByButton={(value: string) => {
            setFilter(value);
            setPage(1);
          }}
          defaultFilterButtonValue="newest"
        />
      </div>

      {isLoadingComments && <PageLoader />}

      {commentsData?.comments?.length === 0 && (
        <div>
          <h1 className="text-dark text-[16px] md:text-[20px]">
            This Poll has no comments yet
          </h1>
        </div>
      )}

      {commentsData && commentsData.comments.length > 0 && (
        <div
          className={`${
            isFetchingComments
              ? "opacity-50 pointer-events-none"
              : "opacity-100 "
          } flex flex-col gap-6`}
        >
          {commentsData.comments.map((comment: CommentType) => (
            <PollCommentCard comment={comment} key={comment.id} />
          ))}

          {/* PAGINATION */}
          <Pagination
            page={page}
            setPage={setPage}
            paginationData={commentsData.meta}
            isFetching={isFetchingComments}
          />
        </div>
      )}
    </>
  );
};

export default PollCommentSection;
