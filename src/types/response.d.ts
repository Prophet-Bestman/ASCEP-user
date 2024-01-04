/* eslint-disable @typescript-eslint/no-explicit-any */
interface ReportData {
  id: number;
  user_id: number;
  title: string;
  description: string;
  submission_date: any;
  status_id: any;
  report_type: string;
  updatedAt: string;
  createdAt: string;
  longitude: number;
  latitude: number;
  location_meta: string;
  total_comments_cache: number;
  reportSDGs: ReportSdg[];
  reportCategory: ReportCategory;
  reporter: Reporter;
  reportImages: ReportImage[];
}

interface ReportSdg {
  sdg_id: number;
  report_id: number;
  sdg: Sdg;
}

interface Sdg {
  title: string;
  banner: string;
  id: number;
}

interface ReportCategory {
  category_id: number;
  report_id: number;
  categoryDetail: CategoryDetail;
}

interface CategoryDetail {
  name: string;
  id: number;
}

interface Reporter {
  username: string;
  firstname: any;
  lastname: any;
  profile_picture: any;
  id: number;
}

interface ReportImage {
  image_url: string;
  report_id: number;
}