import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormCheckBoxSDG,
  FormDocumentInput,
  FormImageInput,
  FormInput,
  FormSelectMultipleCategory,
  FormSelectWard,
  FormTags,
  NotFound,
  TextEditor,
} from "@/components/Democracy";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { startProposalSchema } from "@/schemas/ProposalSchema";
import FormTextArea from "@/components/Democracy/common/FormTextArea";
import {
  useGetProposalInfo,
  usePublishProposal,
} from "@/api/democracy/proposals";
import TargetsMultiSelect from "@/components/custom/TargetsMultiSelect";
import { IconWrapper } from "@/components/custom";
import { FaSpinner } from "react-icons/fa";
import { useAppContext } from "@/contexts/AppContext";
import { useGetAllCategories } from "@/api/category";

interface EditProposalPageProps {}
const EditProposalPage: React.FC<EditProposalPageProps> = () => {
  const { proposalId } = useParams();
  const { mutateAsync: UpdateProposal, isLoading: isUpdatingProposal } =
    usePublishProposal();

  const { targets: allTargets } = useAppContext();
  const { data: allCategories } = useGetAllCategories();

  const {
    data: proposal,
    isLoading: isLoadingProposal,
    isError,
  } = useGetProposalInfo(proposalId!);

  const [tags, setTags] = useState<string[]>(
    proposal?.proposalTag.map((tag) => tag.tag_name) ?? []
  );
  const [targets, setTargets] = useState<SDGTarget[]>([]);

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);

  const form = useForm<z.infer<typeof startProposalSchema>>({
    resolver: zodResolver(startProposalSchema),
    defaultValues: {
      title: proposal?.title,
      summary: proposal?.summary,
      content: proposal?.content,
      external_video_url: proposal?.external_video_url,
      ward_id: proposal?.ward_id,
      tags: [],
      categories: proposal?.proposalCategory.map((item) => item.category_id),
      sdgs: proposal?.proposalSDGs.map((item) => item.sdgs_id),
      targets: [],
      support_needed: proposal?.support_needed,
      documents: undefined,
      image: undefined,
    },
  });

  const {
    setValue,
    control,
    handleSubmit,
    watch,
    trigger,
    setError,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startProposalSchema>) {
    console.log({ ...values, id: proposal?.id });
  }

  useEffect(() => {
    const IDs = targets.map((target) => target.id);
    setValue("targets", IDs);
  }, [targets]);

  useEffect(() => {
    const IDs = categories.map((category) => category.id);
    setValue("categories", IDs);
  }, [categories]);

  useEffect(() => {
    setValue("tags", tags);
  }, [tags]);

  const onEditorStateChange = (text: any) => {
    setValue("content", text);
    trigger("content");
  };

  useEffect(() => {
    setValue("documents", selectedDocuments);
    trigger("documents");
  }, [selectedDocuments]);

  const editorContent = watch("content");

  const getTargets = () => {
    const newArray = proposal?.proposalTarget
      .map(({ targetInfo }) => {
        const matchingObject = allTargets.find(
          (item) => item.code === targetInfo.code
        );
        return matchingObject || null;
      })
      .filter(Boolean) as SDGTarget[];
    if (newArray) {
      setTargets(newArray);
    }
  };

  const getCategories = () => {
    const newArray = proposal?.proposalCategory
      .map(({ category_id }) => {
        const matchingObject = allCategories?.find(
          (item) => item.id === category_id
        );
        return matchingObject || null;
      })
      .filter(Boolean) as CollectionData[];
    if (newArray) {
      setCategories(newArray);
    }
  };

  useEffect(() => {
    getTargets();
    getCategories();
  }, []);

  return (
    <>
      {isLoadingProposal && (
        <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
          <FaSpinner className="animate-spin text-[100px]" />
        </IconWrapper>
      )}
      {isError && !proposal && <NotFound message="No Debate found" />}

      {proposal && (
        <div className="flex flex-col gap-8 max-w-[800px]">
          {/* HEADING */}
          <div>
            <h1 className="text-[20px] md:text-[36px] text-dark">
              Update Proposal
            </h1>
            <p className="text-[12px] md:text-[14px] text-subtle_text -tracking-[0.28px]">
              How do Debates Work?
            </p>
          </div>
          {/* RECOMMENDATIONS */}
          <div>
            <h2 className="text-[18px] md:text-[24px] -tracking-[0.48px] text-dark mb-2">
              Recommendations for creating a debate
            </h2>
            <ul className="list-disc list-inside pl-3 text-subtle_text flex flex-col gap-4">
              <li className="text-[14px] md:text-[16px] -tracking-[0.32px]">
                Do not use capital letters for the debate title or for whole
                sentences. On the internet, this is considered shouting. And
                nobody likes being shouted at.
              </li>
              <li className="text-[14px] md:text-[16px] -tracking-[0.32px]">
                Any debate or comment suggesting illegal action will be deleted,
                as well as those intending to sabotage the debate spaces.
                Anything else is allowed.
              </li>
              <li className="text-[14px] md:text-[16px] -tracking-[0.32px] ">
                Ruthless criticism is very welcome. This is a space for
                reflection. But we recommend that you stick to elegance and
                intelligence. The world is a better place with these virtues in
                it.
              </li>
            </ul>
          </div>

          {/* FORM */}
          <Form {...form}>
            {/* REQUIRED FIELDS */}
            <h2 className="text-[20px] md:text-[24px] text-dark -tracking-[0.48px]">
              Required Fields
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              {/* TITLE */}
              <FormInput
                name="title"
                label="Proposal title"
                control={control}
                errors={errors}
                placeholder="Enter title of the proposal "
              />
              {/* SUMMARY */}
              <FormTextArea
                name="summary"
                label="Proposal summary (maximum of 200 characters)"
                control={control}
                errors={errors}
              />
              {/* PROPOSAL TEXT */}
              <TextEditor
                name="content"
                label="Proposal Text"
                control={control}
                errors={errors}
                onChange={onEditorStateChange}
                value={editorContent}
              />
              {/* WARD */}
              <FormSelectWard
                /* @ts-ignore */
                control={control}
                /* @ts-ignore */
                errors={errors}
                name="ward_id"
                label="Ward"
                selectedWard={proposal.ward_id}
              />
              {/* SUPPORTS */}
              <FormInput
                name="support_needed"
                control={control}
                errors={errors}
                label="Support needed"
                type="number"
                min={1}
                onChange={(e) => {
                  setValue("support_needed", Number(e.target.value));
                  trigger("support_needed");
                }}
              />
              {/* CATEGORIES */}
              <FormSelectMultipleCategory
                errors={errors}
                control={control}
                label="Select categories"
                name="categories"
                setSelected={setCategories}
                selected={categories}
              />
              {/* OPTIONAL FIELDS */}
              <h2 className="text-[20px] md:text-[24px] text-dark -tracking-[0.48px]">
                Optional Fields
              </h2>

              {/* EXTERNAL VIDEO URL */}
              <FormInput
                name="external_video_url"
                label="External video URL"
                control={control}
                errors={errors}
                placeholder="You may add a link to YouTube or Vimeo"
              />

              {/* DESCRIPTIVE IMAGE */}
              <FormImageInput
                name="image"
                control={control}
                description="You can upload one image of following content types: jpg, up to 1 MB."
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
              />

              {/* DOCUMENT  */}
              <FormDocumentInput
                name="documents"
                control={control}
                errors={errors}
                description="You can upload up to a maximum of 3 documents of following content types: pdf, up to 3 MB per file."
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (selectedDocuments.length === 3) {
                      setError("documents", {
                        type: "manual",
                        message: "You can only upload 3 documents",
                      });
                    } else {
                      setSelectedDocuments((selectedDocuments) => [
                        ...selectedDocuments,
                        file,
                      ]);
                    }
                  }
                }}
                setSelectedDocuments={setSelectedDocuments}
                selectedDocuments={selectedDocuments}
              />

              {/* MAP */}
              <div>
                <h4 className="text-[14px] text-dark ">Map location</h4>
                <p className="text-subtle_text text-[14px]">
                  Navigate the map to the location and place the marker
                </p>
              </div>

              {/* TAGS */}
              <FormTags tags={tags} setTags={setTags} />

              {/* SDGs */}
              <div>
                <h5 className="text-[16px] md:text-[18px] text-dark -tracking-[0.36px] ">
                  Sustainable Development Goals and Targets
                </h5>
                <p className="text-[14px] md:text-[16px] text-subtle_text -tracking-[0.36px]">
                  You can choose one or several SDGs aligned with your debate
                </p>
                <div className="flex flex-wrap gap-[15px] justify-stretch  mt-[23px]">
                  <FormCheckBoxSDG control={control} name="sdgs" />
                </div>
                <p className="text-[14px] md:text-[16px] text-subtle_text -tracking-[0.36px] my-2">
                  You can introduce the code of a specific goal/target or a text
                  to find one. For more information visit the
                  <Link to="#" className="text-primary ml-1">
                    SDG help page.
                  </Link>
                </p>
              </div>

              {/* TARGETS */}
              <TargetsMultiSelect selected={targets} setSelected={setTargets} />

              <Button
                type="submit"
                className="w-full max-w-[300px] p-0 h-fit py-3"
                isLoading={isUpdatingProposal}
                disabled
              >
                Coming soon
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditProposalPage;