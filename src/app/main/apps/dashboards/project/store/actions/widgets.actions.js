import widgetsService from '../services/widgets.service'

export const GET_TOTAL_USERS_REQUEST = "[PROJECT DASHBOARD APP] GET TOTAL USERS REQUEST";
export const GET_TOTAL_USERS_SUCCESS = "[PROJECT DASHBOARD APP] GET TOTAL USERS SUCCESS";
export const GET_TOTAL_USERS_FAILURE = "[PROJECT DASHBOARD APP] GET TOTAL USERS FAILURE";
export const GET_TOTAL_BOOKINGS_REQUEST = "[PROJECT DASHBOARD APP] GET TOTAL BOOKINGS REQUEST";
export const GET_TOTAL_BOOKINGS_SUCCESS = "[PROJECT DASHBOARD APP] GET TOTAL BOOKINGS SUCCESS";
export const GET_TOTAL_BOOKINGS_FAILURE = "[PROJECT DASHBOARD APP] GET TOTAL BOOKINGS FAILURE";
export const GET_TOTAL_LISTINGS_REQUEST = "[PROJECT DASHBOARD APP] GET TOTAL LISTINGS REQUEST";
export const GET_TOTAL_LISTINGS_SUCCESS = "[PROJECT DASHBOARD APP] GET TOTAL LISTINGS SUCCESS";
export const GET_TOTAL_LISTINGS_FAILURE = "[PROJECT DASHBOARD APP] GET TOTAL LISTINGS FAILURE";
export const GET_TOTAL_LISTINGS_CATEGORY_REQUEST = "[PROJECT DASHBOARD APP] GET TOTAL LISTINGS CATEGORY REQUEST";
export const GET_TOTAL_LISTINGS_CATEGORY_SUCCESS = "[PROJECT DASHBOARD APP] GET TOTAL LISTINGS CATEGORY SUCCESS";
export const GET_TOTAL_LISTINGS_CATEGORY_FAILURE = "[PROJECT DASHBOARD APP] GET TOTAL LISTINGS CATEGORY FAILURE";
export const GET_ALL_CATEGORY_REQUEST = "[PROJECT DASHBOARD APP] GET ALL CATEGORY REQUEST";
export const GET_ALL_CATEGORY_SUCCESS = "[PROJECT DASHBOARD APP] GET ALL CATEGORY SUCCESS";
export const GET_ALL_CATEGORY_FAILURE = "[PROJECT DASHBOARD APP] GET ALL CATEGORY FAILURE";

export const getTotalUsers = () => {

  const request = widgetsService.getTotalUsers();

  return dispatch =>
    request
      .then(response => {
        dispatch({
          type: GET_TOTAL_USERS_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: GET_TOTAL_USERS_FAILURE,
          payload: error
        });
      });
}

export const getTotalUsersByDate = (days) => {

  const request = widgetsService.getTotalUsersByDate(days);

  return dispatch =>
    request
      .then(response => {
        dispatch({
          type: GET_TOTAL_USERS_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: GET_TOTAL_USERS_FAILURE,
          payload: error
        });
      });
}

export const getTotalBookingsByDate = (days) => {

  const request = widgetsService.getTotalBookingsByDate(days);

  return dispatch =>
    request
      .then(response => {
        dispatch({
          type: GET_TOTAL_BOOKINGS_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: GET_TOTAL_BOOKINGS_FAILURE,
          payload: error
        });
      });
}

export const getTotalListingsByDate = (days, category) => {

  const request = widgetsService.getTotalListingsByDate(days, category);

  return dispatch =>
    request
      .then(response => {
        dispatch({
          type: GET_TOTAL_LISTINGS_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: GET_TOTAL_LISTINGS_FAILURE,
          payload: error
        });
      });
}

export const getTotalListingsByCategory = (category) => {

  const request = widgetsService.getTotalListingsByCategory(category);

  return dispatch =>
    request
      .then(response => {
        dispatch({
          type: GET_TOTAL_LISTINGS_CATEGORY_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: GET_TOTAL_LISTINGS_CATEGORY_FAILURE,
          payload: error
        });
      });
}

export const getAllCategories = () => {

  const request = widgetsService.getAllCategories();

  return dispatch =>
    request
      .then(response => {
        dispatch({
          type: GET_ALL_CATEGORY_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_CATEGORY_FAILURE,
          payload: error
        });
      });
}
