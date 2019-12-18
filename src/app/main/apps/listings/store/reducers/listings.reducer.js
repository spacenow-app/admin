import * as Actions from "../actions";

const initialState = {
  searchText: "",
  spacenow: {
    count: 0,
    data: []
  },
  external: {
    users: [],
    listings: []
  },
  listing: {
    data: null
  },
  categories: {
    data: [],
    isLoading: true,
    error: null
  },
  rules: {
    data: [],
    isLoading: true,
    error: null
  },
  images: {
    data: [],
    isLoading: true,
    error: null
  },
  holidays: {
    data: [],
    isLoading: true,
    error: null
  },
  amenities: {
    data: [],
    isLoading: true,
    error: null
  },
  accessTypes: {
    data: [],
    isLoading: true,
    error: null
  },
  specifications: {
    data: [],
    isLoading: true,
    error: null
  },
  availabilities: {
    data: [],
    isLoading: true,
    error: null
  }
};

const listingsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_LISTING: {
      return {
        ...state,
        listing: {
          data: action.payload,
        }
      };
    }
    case Actions.GET_LISTINGS: {
      return {
        ...state,
        spacenow: {
          data: action.payload.rows,
          count: action.payload.count
        }
      };
    }
    case Actions.SET_LISTINGS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.GET_EXTERNAL_USERS_BY_PROVIDER: {
      return {
        ...state,
        external: {
          users: action.payload,
          ...state.external.listings
        }
      };
    }
    case Actions.GET_EXTERNAL_CLICKS_BY_USER: {
      return {
        ...state,
        external: {
          ...state.external.users,
          listings: action.payload
        }
      };
    }
    case Actions.GET_RULES_START: {
      return {
        ...state
      };
    }
    case Actions.GET_RULES_SUCCESS: {
      return {
        ...state,
        rules: {
          data: action.payload,
          isLoading: false
        }
      };
    }
    case Actions.GET_RULES_ERROR: {
      return {
        ...state,
        rules: {
          data: [],
          isLoading: false,
          error: action.payload
        }
      };
    }
    case Actions.GET_AMENITIES_START: {
      return {
        ...state
      };
    }
    case Actions.GET_AMENITIES_SUCCESS: {
      return {
        ...state,
        amenities: {
          data: action.payload,
          isLoading: false
        }
      };
    }
    case Actions.GET_AMENITIES_ERROR: {
      return {
        ...state,
        amenities: {
          data: [],
          isLoading: false,
          error: action.payload
        }
      };
    }
    case Actions.GET_SPECIFICATIONS_START: {
      return {
        ...state
      };
    }
    case Actions.GET_SPECIFICATIONS_SUCCESS: {
      return {
        ...state,
        specifications: {
          data: action.payload,
          isLoading: false
        }
      };
    }
    case Actions.GET_SPECIFICATIONS_ERROR: {
      return {
        ...state,
        specifications: {
          data: [],
          isLoading: false,
          error: action.payload
        }
      };
    }
    case Actions.GET_AVAILABILITIES_START: {
      return {
        ...state
      };
    }
    case Actions.GET_AVAILABILITIES_SUCCESS: {
      return {
        ...state,
        availabilities: {
          data: action.payload,
          isLoading: false
        }
      };
    }
    case Actions.GET_AVAILABILITIES_ERROR: {
      return {
        ...state,
        availabilities: {
          data: [],
          isLoading: false,
          error: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default listingsReducer;
