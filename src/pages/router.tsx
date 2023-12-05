import { Route, Routes } from "react-router-dom";
import axios from "axios";

import routes, { responseRoutes, unauthenticatedRoutes } from "./routes";
import { AuthPagesLayout, MainLayout, ResponseLayout } from "@/layouts";
import config from "@/utils/config";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Router = () => {
  const pageRoutes = routes.map(({ path, title, element }: RouterType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  const responsePages = responseRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  const authRoutes = unauthenticatedRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/auth/${path}`} element={element} />;
    }
  );

  const { toast } = useToast();

  useEffect(() => {
    axios.interceptors.request.use(
      (axiosConfig) => {
        const token = localStorage.getItem(config.key.token);
        axiosConfig.headers.Authorization = `Bearer ${token}`;
        return axiosConfig;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response) {
          if (error?.response?.status === 401) {
            // SIGNOUT LOGIC
          } else {
            // SOME LOGIC TO SHOW ERROR MESSAGE
            // alert(error?.response?.data?.message);
            toast({
              title: "Error!",
              description: error?.response?.data?.message,
              variant: "error",
            });
          }
        } else if (error.request) {
          // LOGIC TO SHOW ERROR MESSAGE
        } else {
          // flash error message
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPagesLayout />}>
        {authRoutes}
      </Route>
      <Route path="" element={<MainLayout />}>
        {pageRoutes}
        <Route path="" element={<ResponseLayout />}>
          {responsePages}
        </Route>
      </Route>
      <Route path="*" element={<div>Route Not Found</div>} />
    </Routes>
  );
};

export default Router;
