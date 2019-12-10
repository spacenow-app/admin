import SpacenowUtils from "@spacenow/SpacenowUtils";
import { getClientWithAuth } from "@graphql/apolloClient";
import * as widgetsQL from "../graphql/widgets.graphql";

class widgetsService extends SpacenowUtils.EventEmitter {
  init = () => { };

  getTotalUsers = () => {

    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: widgetsQL.queryTotalUsersLegacy
        })
        .then(response => {
          if (response.data.getTotalUsersLegacy) {
            resolve(response.data.getTotalUsersLegacy);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          reject(error)
        });
    });
  };

  getTotalUsersByDate = (days) => {

    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: widgetsQL.queryTotalUsersLegacyByDate,
          variables: { days: parseInt(days) }
        })
        .then(response => {
          if (response.data.getTotalUsersLegacyByDate) {
            resolve(response.data.getTotalUsersLegacyByDate);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          reject(error)
        });
    });
  };

  getTotalBookingsByDate = (days) => {

    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: widgetsQL.queryTotalBookingsByDate,
          variables: { days: parseInt(days) }
        })
        .then(response => {
          if (response.data.getTotalBookingsByDate) {
            resolve(response.data.getTotalBookingsByDate);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          reject(error)
        });
    });
  };

  getTotalListings = () => {

    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: widgetsQL.queryTotalListings
        })
        .then(response => {
          if (response.data.getTotalListings) {
            resolve(response.data.getTotalListings);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          reject(error)
        });
    });
  };

  getTotalListingsByDate = (days, category) => {

    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: widgetsQL.queryTotalListingsByDate,
          variables: { days: parseInt(days), category: parseInt(category) }
        })
        .then(response => {
          if (response.data.getTotalListingsByDate) {
            resolve(response.data.getTotalListingsByDate);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          reject(error)
        });
    });
  };

  getTotalListingsByCategory = (category) => {

    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: widgetsQL.queryTotalListingsByCategory,
          variables: { category: category }
        })
        .then(response => {
          if (response.data.getTotalListingsByCategory) {
            resolve(response.data.getTotalListingsByCategory);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          reject(error)
        });
    });
  };

  getAllCategories = () => {

    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: widgetsQL.queryGetAllCategories
        })
        .then(response => {
          if (response.data.getCategories) {
            resolve(response.data.getCategories);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          reject(error)
        });
    });
  };

}

const instance = new widgetsService();

export default instance;
