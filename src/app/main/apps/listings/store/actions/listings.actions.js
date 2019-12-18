import { SpacenowUtils } from '@spacenow';
import listingsService from '../services/listings';
import { showMessage } from 'app/store/actions/spacenow';

export const GET_LISTING = '[MANAGMENT APP] GET LISTING';
export const SAVE_LISTING = '[MANAGMENT APP] SAVE LISTING';
export const GET_LISTINGS = '[MANAGMENT APP] GET LISTINGS';
export const GET_EXTERNAL_USERS_BY_PROVIDER =
  '[MANAGMENT APP] GET EXTERNAL USERS BY PROVIDER';
export const GET_EXTERNAL_CLICKS_BY_USER =
  '[MANAGMENT APP] GET EXTERNAL CLICKS BY USER';
export const SET_LISTINGS_SEARCH_TEXT =
  '[MANAGMENT APP] SET LISTINGS SEARCH TEXT';
export const SET_EXTERNAL_LISTINGS_CLICK_BY_USER_SEARCH_TEXT =
  '[MANAGMENT APP] SET EXTERNAL LISTINGS SEARCH TEXT';

export function getListingById(id) {

  const request = listingsService.getListingById(id);

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_LISTING,
        payload: response
      });
    });
}


export function getListings() {
  const request = listingsService.getListings();

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_LISTINGS,
        payload: response
      });
    });
}

export function setListingsSearchText(event) {
  return {
    type: SET_LISTINGS_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export const getUsersByProvider = () => async (dispatch) => {
  try {
    const response = await listingsService.getUsersByProvider();
    dispatch({
      type: GET_EXTERNAL_USERS_BY_PROVIDER,
      payload: response
    });
  } catch (err) {
    console.error('ERROR ===>>> ', err);
  }
};

export const getExternalClicksByUser = (userId) => async (dispatch) => {
  try {
    const response = await listingsService.getExternalClicksByUser(userId);
    dispatch({
      type: GET_EXTERNAL_CLICKS_BY_USER,
      payload: response
    });
  } catch (err) {
    console.error('ERROR ===>>> ', err);
  }
};

export const saveListing = (data) => async (dispatch) => {

  try {
    const response = await listingsService.mutationListing(data);
    dispatch(showMessage({ message: 'Listing Saved' }));
    dispatch({
      type: SAVE_LISTING,
      payload: response
    });
  } catch (err) {
    console.error('ERROR ===>>> ', err);
  }
}

export const newListing = () => {
  const data = {
    id: SpacenowUtils.generateGUID,
    name: '',
    handle: '',
    description: '',
    categories: [],
    tags: [],
    images: [],
    priceTaxExcl: 0,
    priceTaxIncl: 0,
    taxRate: 0,
    comparedPrice: 0,
    quantity: 0,
    sku: '',
    width: '',
    height: '',
    depth: '',
    weight: '',
    extraShippingFee: 0,
    active: true
  };

  return {
    type: GET_LISTING,
    payload: data
  }
}
