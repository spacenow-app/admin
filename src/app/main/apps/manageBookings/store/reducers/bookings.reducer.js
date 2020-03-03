import * as Actions from '../actions'

const initialState = {
  data: [],
  searchValues: null
  // approve: {
  //   status: false
  // }
}

const bookingsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BOOKINGS: {
      return {
        ...state,
        data: action.payload
      }
    }

    case Actions.SET_BOOKINGS_SEARCH_VALUES: {
      return {
        ...state,
        searchValues: { ...state.searchValues, [action.id]: action.searchValue }
      }
    }

    case Actions.ACCEPT_BOOKING: {
      return {
        ...state
        // approve: {
        //   status: action.payload.status
        // }
      }
    }

    default: {
      return state
    }
  }
}

export default bookingsReducer
