import Service from './../services';

export const GET_VOUCHERS = '[MANAGMENT APP] GET VOUCHERS';
export const FAILURE_VOUCHERS = '[MANAGMENT APP] FAILURE VOUCHERS';

export function listVouchers() {
  return (dispatch) =>
    Service.getVouchers()
      .then((data) => dispatch({ type: GET_VOUCHERS, payload: data }))
      .catch((err) => dispatch({ type: FAILURE_VOUCHERS, error: err }));
}

export function desactiveVoucher(voucherCode) {
  return (dispatch) =>
    Service.desactiveVoucher(voucherCode)
      .then((data) => dispatch({ type: GET_VOUCHERS, payload: data }))
      .catch((err) => dispatch({ type: FAILURE_VOUCHERS, error: err }));
}

export function createVoucher({ code, type, value, usageLimit, expireAt }) {
  return (dispatch) =>
    Service.createVoucher(code, type, value, usageLimit, expireAt)
      .then((data) => dispatch({ type: GET_VOUCHERS, payload: data }))
      .catch((err) => dispatch({ type: FAILURE_VOUCHERS, error: err }));
}
