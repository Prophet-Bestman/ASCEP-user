import { Button } from "@/components/ui/button";
import {
  AdvancedSearch,
  FetchingError,
  InitiativesCardViewCard,
  ListViewCard,
  PagesHeroSection,
  Pagination,
} from "@/components/Democracy";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";
import { useInitiativeContext } from "@/contexts/InitiativeContext";
import { initiativeFilterButtonOptions } from "@/utils/Democracy/Initiatives";
import { IconWrapper } from "@/components/custom";
import { FaSpinner } from "react-icons/fa";
import { useAuthContext } from "@/providers/AuthProvider";

const InitiativesHomePage = () => {
  const {
    view,
    setView,
    fetchingInitiatives,
    fetchingInitiativeError,
    fetchedInitiativeData,
    refetchInitiatives,
    filterByButton,
    getAllInitiatives,
    filterOptions,
    setFilterOptions,
    perPage,
    setPage,
  } = useInitiativeContext();

  const { isLoggedIn } = useAuthContext();

  const pageDescription =
    "Citizens' proposals are an opportunity for neighbours and collectivesto decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.";
  return (
    <>
      {/* HEADING */}
      <PagesHeroSection title="initiatives" description={pageDescription} />
      {isLoggedIn && (
        <Link to={ROUTES.START_INITIATIVE_ROUTE}>
          <Button className="w-[175px] mb-4">Start Initiative</Button>
        </Link>
      )}
      <div className=" flex flex-col gap-16 mt-[50px] w-full max-w-[1200px]">
        {/* ADVANCED SEARCH */}
        <AdvancedSearch
          filterButtonOptions={initiativeFilterButtonOptions}
          filterByButton={filterByButton}
          setView={setView}
          view={view}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />

        {/* ERROR */}
        {fetchingInitiativeError && !fetchingInitiatives && (
          <FetchingError
            message="Error fetching Proposals"
            refetching={fetchingInitiatives}
            retryFunction={() => refetchInitiatives()}
          />
        )}

        {/* LOADING */}
        {fetchingInitiatives && (
          <div className="w-full flex justify-center">
            <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
              <FaSpinner className="animate-spin text-[100px]" />
            </IconWrapper>
          </div>
        )}

        {/* LIST VIEW */}
        {view === "list-view" && fetchedInitiativeData && (
          <div className="grid grid-cols-1 my-10 gap-10 max-w-[700px]">
            {fetchedInitiativeData?.initiatives.map((initiative) => (
              <ListViewCard
                title={initiative.title}
                route={ROUTES.PROPOSAL_INFO_ROUTE(initiative.id)}
                key={initiative.id}
              />
            ))}
          </div>
        )}

        {/* CARD VIEW */}
        {view === "card-view" && fetchedInitiativeData && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-14 justify-stretch">
            {fetchedInitiativeData?.initiatives.map((initiative) => (
              <InitiativesCardViewCard
                initiative={initiative}
                key={initiative.id}
              />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {fetchedInitiativeData && (
          <Pagination
            meta={fetchedInitiativeData?.meta}
            onPageChange={getAllInitiatives}
            filterOptions={filterOptions}
            perPage={perPage}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default InitiativesHomePage;
