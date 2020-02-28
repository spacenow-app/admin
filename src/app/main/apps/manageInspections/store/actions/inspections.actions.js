import inspectionsService from "../services/inspections";

export const GET_INSPECTIONS = "[MANAGMENT APP] GET INSPECTIONS";
export const SET_INSPECTIONS_SEARCH_VALUES =
  "[MANAGMENT APP] SET INSPECTIONS SEARCH FILTERS";

export function getInspections() {
  const request = inspectionsService.getInspections();

  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_INSPECTIONS,
        payload: response
      });
    });
}

export function setInspectionsSearchValues(id, searchValue) {
  return {
    type: SET_INSPECTIONS_SEARCH_VALUES,
    id: id,
    searchValue: searchValue
  };
}
