import { ProjectDashboardAppConfig } from './dashboards/project/ProjectDashboardAppConfig';
import { ManagmentConfig } from './managment/ManagmentConfig';
import { ManageBookingsConfig } from './manageBookings/ManageBookingsConfig';
import { ServiceFeeAppConfig } from '../apps/managmentFee/project/ServiceFeeAppConfig';
import { ManagmentListingConfig } from '../apps/managmentListing/ManagmentListingConfig';
import { ListingConfig } from '../apps/listings/ListingConfig';
import { ManageVouchersConfig } from './../apps/manageVouchers/ManageVouchersConfig';
import { ManageInspectionsConfig } from '../apps/manageInspections/ManageInspectionsConfig';

export const appsConfigs = [
  ProjectDashboardAppConfig,
  ManagmentConfig,
  ManageBookingsConfig,
  ServiceFeeAppConfig,
  ManagmentListingConfig,
  ListingConfig,
  ManageVouchersConfig,
  ManageInspectionsConfig
];
