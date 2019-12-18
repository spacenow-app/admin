import availabilitiesService from '../services/availabilities';

export const GET_AVAILABILITIES_START = '[LISTING] GET AVAILABILITIES START';
export const GET_AVAILABILITIES_SUCCESS = '[LISTING] GET AVAILABILITIES SUCCESS';
export const GET_AVAILABILITIES_ERROR = '[LISTING] GET AVAILABILITIES ERROR';

export const getAvailabilities = (id) => async (dispatch) => {

  dispatch({ type: GET_AVAILABILITIES_START })
  try {
    const data = await availabilitiesService.getAvailabilities(id);
    dispatch({ type: GET_AVAILABILITIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_AVAILABILITIES_ERROR, payload: error });
  }

}
