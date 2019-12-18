import specificationsService from '../services/specifications';

export const GET_SPECIFICATIONS_START = '[LISTING] GET SPECIFICATIONS START';
export const GET_SPECIFICATIONS_SUCCESS = '[LISTING] GET SPECIFICATIONS SUCCESS';
export const GET_SPECIFICATIONS_ERROR = '[LISTING] GET SPECIFICATIONS ERROR';

export const getSpecifications = (id) => async (dispatch) => {

  dispatch({ type: GET_SPECIFICATIONS_START })
  try {
    const data = await specificationsService.getSpecifications(id);
    dispatch({ type: GET_SPECIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SPECIFICATIONS_ERROR, payload: error });
  }

}
