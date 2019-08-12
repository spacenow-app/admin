import { getClientWithAuth } from "@graphql/apolloClient";
import * as bookingsQL from "../graphql/bookings";

class bookingsService {
  init = () => {};

  getBookings = () => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: bookingsQL.queryGetAllBookings
        })
        .then(response => {
          if (response.data.getAllBookings) {
            resolve(response.data.getAllBookings);
          } else {
            reject(response.data.error);
          }
        });
    });
  };
}

const instance = new bookingsService();

export default instance;
