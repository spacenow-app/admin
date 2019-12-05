import Service from './../services';

export const GET_VOUCHERS = '[MANAGMENT APP] GET VOUCHERS';
export const FAILURE_VOUCHERS = '[MANAGMENT APP] FAILURE VOUCHERS';

export function listVouchers() {
  return (dispatch) =>
    Service.getVouchers()
      .then((data) => {
        console.log('Actions -> resolve', data);
        dispatch({ type: GET_VOUCHERS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: FAILURE_VOUCHERS, error: err });
      });
}
