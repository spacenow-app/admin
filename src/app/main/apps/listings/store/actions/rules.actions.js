import rulesService from '../services/rules';

export const GET_RULES_START = '[LISTING] GET RULES START';
export const GET_RULES_SUCCESS = '[LISTING] GET RULES SUCCESS';
export const GET_RULES_ERROR = '[LISTING] GET RULES ERROR';

export const getRules = () => async (dispatch) => {

  dispatch({ type: GET_RULES_START })
  try {
    const data = await rulesService.getRules();
    dispatch({ type: GET_RULES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RULES_ERROR, payload: error });
  }

}
