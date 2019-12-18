import amenitiesService from '../services/amenities';

export const GET_AMENITIES_START = '[LISTING] GET AMENITIES START';
export const GET_AMENITIES_SUCCESS = '[LISTING] GET AMENITIES SUCCESS';
export const GET_AMENITIES_ERROR = '[LISTING] GET AMENITIES ERROR';

export const getAmenities = (id) => async (dispatch) => {

  dispatch({ type: GET_AMENITIES_START })
  try {
    const data = await amenitiesService.getAmenities(id);
    dispatch({ type: GET_AMENITIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_AMENITIES_ERROR, payload: error });
  }

}
