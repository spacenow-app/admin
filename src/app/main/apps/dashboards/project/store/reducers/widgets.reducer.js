import * as Actions from "../actions";

const initialState = {
  categories: {
    isLoading: false,
    data: null,
    error: null,
  },
  users: {
    isLoading: false,
    data: null,
    error: null,
  },
  listings: {
    isLoading: false,
    data: null,
    error: null,
  },
  listingsCategory: {
    isLoading: false,
    data: null,
    error: null,
  },
  listingsCategories: {
    isLoading: true,
    data: null,
    error: null,
  },
  bookings: {
    isLoading: false,
    data: null,
    error: null,
  }
};

const widgetsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        ...state.categories
      };
    case Actions.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        ...state.categories,
        categories: {
          isLoading: false,
          data: action.payload
        }
      };
    case Actions.GET_ALL_CATEGORY_FAILURE:
      return {
        ...state,
        ...state.categories,
        categories: {
          isLoading: false,
          error: action.payload
        }
      };
    case Actions.GET_TOTAL_USERS_REQUEST:
      return {
        ...state,
        ...state.users
      };
    case Actions.GET_TOTAL_USERS_SUCCESS:
      return {
        ...state,
        ...state.users,
        users: {
          isLoading: false,
          data: action.payload
        }
      };
    case Actions.GET_TOTAL_USERS_FAILURE:
      return {
        ...state,
        ...state.users,
        users: {
          isLoading: false,
          error: action.payload
        }
      };
    case Actions.GET_TOTAL_BOOKINGS_REQUEST:
      return {
        ...state,
        ...state.bookings
      };
    case Actions.GET_TOTAL_BOOKINGS_SUCCESS:
      return {
        ...state,
        ...state.bookings,
        bookings: {
          isLoading: false,
          data: action.payload
        }
      };
    case Actions.GET_TOTAL_BOOKINGS_FAILURE:
      return {
        ...state,
        ...state.bookings,
        bookings: {
          isLoading: false,
          error: action.payload
        }
      };
    case Actions.GET_TOTAL_LISTINGS_REQUEST:
      return {
        ...state,
        ...state.listings
      };
    case Actions.GET_TOTAL_LISTINGS_SUCCESS:
      return {
        ...state,
        ...state.listings,
        listings: {
          isLoading: false,
          data: action.payload
        }
      };
    case Actions.GET_TOTAL_LISTINGS_FAILURE:
      return {
        ...state,
        ...state.listings,
        listings: {
          isLoading: false,
          error: action.payload
        }
      };
    case Actions.GET_TOTAL_LISTINGS_CATEGORY_REQUEST:
      return {
        ...state,
        ...state.listingsCategory
      };
    case Actions.GET_TOTAL_LISTINGS_CATEGORY_SUCCESS:
      return {
        ...state,
        ...state.listingsCategory,
        listingsCategory: {
          isLoading: false,
          data: action.payload
        }
      };
    case Actions.GET_TOTAL_LISTINGS_CATEGORY_FAILURE:
      return {
        ...state,
        ...state.listingsCategory,
        listingsCategory: {
          isLoading: false,
          error: action.payload
        }
      };
    case Actions.GET_LISTINGS_CATEGORIES_REQUEST:
      return {
        ...state,
        ...state.listingsCategories
      };
    case Actions.GET_LISTINGS_CATEGORIES_SUCCESS:
      return {
        ...state,
        listingsCategories: {
          isLoading: false,
          data: action.payload
        }
      };
    case Actions.GET_LISTINGS_CATEGORIES_FAILURE:
      return {
        ...state,
        listingsCategories: {
          isLoading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
};

export default widgetsReducer;
