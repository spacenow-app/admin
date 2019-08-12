import { ProjectDashboardAppConfig } from "./dashboards/project/ProjectDashboardAppConfig";
import { ManagmentConfig } from "./managment/ManagmentConfig";
import { ManageBookingsConfig } from "./manageBookings/ManageBookingsConfig";
import { ServiceFeeAppConfig } from "../apps/managmentFee/project/ServiceFeeAppConfig";
import { ManagmentListingConfig } from "../apps/managmentListing/ManagmentListingConfig";

export const appsConfigs = [
  ProjectDashboardAppConfig,
  ManagmentConfig,
  ManageBookingsConfig,
  ServiceFeeAppConfig,
  ManagmentListingConfig
];
