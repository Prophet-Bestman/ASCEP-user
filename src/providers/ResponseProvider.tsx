import { useGetAllReports } from "@/api/response";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ResponseContextType {
  reports: ReportData[];
  filters: ResponseFilter;
  isLoading: boolean;
  filtersString: string;
  clearFilter: () => void;
  filterDate: (arg: string | null) => void;
  filterLocation: (arg: string | null) => void;
  filterCategory: (arg: string | null) => void;
}
interface ResponseFilter {
  longitude: string | null;
  start_date: string | null;
  category: string | null;
}

const filtersDefault: ResponseFilter = {
  longitude: null,
  start_date: null,
  category: null,
};

const ResponseContext = createContext<ResponseContextType>({
  reports: [],
  filters: filtersDefault,
  isLoading: false,
  filtersString: "",
  clearFilter: () => {},
  filterDate: () => {},
  filterLocation: () => {},
  filterCategory: () => {},
});

export const useResponseContext = () => useContext(ResponseContext);

export default function RepsonseProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState(filtersDefault);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [filtersString, setFiltersString] = useState("");

  const { data, isLoading, refetch } = useGetAllReports({
    filtersString,
  });

  useEffect(() => {
    if (data?.length) {
      setReports(data);
    } else setReports([]);
  }, [data]);

  useEffect(() => {
    // Create an array of key-value pairs for non-null filter properties
    const filterEntries = Object.entries(filters).filter(
      ([, value]) => value !== null
    );

    // Construct the filtersString by joining key-value pairs with '&'
    const newFiltersString = filterEntries
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    // Update the state with the new filtersString
    setFiltersString(newFiltersString ? `?${newFiltersString}` : "");
  }, [filters]);

  const clearFilter = () => {
    setFilters(filtersDefault);
    refetch();
  };
  const filterDate = (arg: string | null) => {
    setFilters({ ...filters, start_date: arg });
  };

  const filterLocation = (arg: string | null) => {
    setFilters({ ...filters, longitude: arg });
  };

  const filterCategory = (arg: string | null) => {
    setFilters({ ...filters, category: arg });
  };

  return (
    <ResponseContext.Provider
      value={{
        isLoading,
        reports,
        filtersString,
        filters,
        clearFilter,
        filterCategory,
        filterDate,
        filterLocation,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
}
