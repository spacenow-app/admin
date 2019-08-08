import usersService from '../../store/services/users'

export const GET_USERS = '[MANAGMENT APP] GET USERS';
export const SET_USERS_SEARCH_TEXT = '[MANAGMENT APP] SET USERS SEARCH TEXT';

export function getUsers() {

    const request = usersService.getUsers();

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_USERS,
                payload: response
            })
        });
}

export function setUsersSearchText(event) {
    return {
        type: SET_USERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}


// import axios from 'axios';
// import {SpacenowUtils} from '@spacenow';
// import {showMessage} from 'app/store/actions/spacenow';

// // export const GET_USER = '[MANAGMENT APP] GET USER';
// // export const GET_USER = '[MANAGMENT APP] SAVE USER';

// export function getUser(params)
// {
//     const request = axios.get('/api/managment/user', {params});

//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 // type   : GET_USER,
//                 payload: response.data
//             })
//         );
// }

// export function saveUser(data)
// {
//     const request = axios.post('/api/managment/user/save', data);

//     return (dispatch) =>
//         request.then((response) => {

//                 dispatch(showMessage({message: 'User Saved'}));

//                 return dispatch({
//                     type   : SAVE_USER,
//                     payload: response.data
//                 })
//             }
//         );
// }

// export function newUser()
// {
//     const data = {
//         id              : FuseUtils.generateGUID(),
//         name            : '',
//         handle          : '',
//         description     : '',
//         categories      : [],
//         tags            : [],
//         images          : [],
//         priceTaxExcl    : 0,
//         priceTaxIncl    : 0,
//         taxRate         : 0,
//         comparedPrice   : 0,
//         quantity        : 0,
//         sku             : '',
//         width           : '',
//         height          : '',
//         depth           : '',
//         weight          : '',
//         extraShippingFee: 0,
//         active          : true
//     };

//     return {
//         // type   : GET_USER,
//         payload: data
//     }
// }
