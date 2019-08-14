export const GET_WIDGETS = "[PROJECT DASHBOARD APP] GET WIDGETS";

export function getWidgets() {
  const request = new Promise((resolve, reject) =>
    resolve({
      data: {
        widget4: {
          title: "Users",
          data: {
            label: "ACTIVE USERS",
            count: 108,
            extra: {
              label: "Active",
              count: 10
            }
          },
          detail:
            "You can show some detailed information about this widget in here."
        },
        widget2: {
          title: "Bookings",
          data: {
            label: "ACTIVE BOOKINGS",
            count: 18,
            extra: {
              label: "Active",
              count: 10
            }
          },
          detail:
            "You can show some detailed information about this widget in here."
        }
      }
    })
  );

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_WIDGETS,
        payload: response.data
      })
    );
}
