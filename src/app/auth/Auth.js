import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SpacenowSplashScreen } from '@spacenow';
import jwtService from 'app/auth/store/services/jwtService';
import * as Actions from 'app/store/actions';
import * as userActions from 'app/auth/store/actions';

const Auth = props => {
	const dispatch = useDispatch();
	const [waitAuthCheck, setWaitAuthCheck] = useState(true);

	useEffect(() => {
		jwtService.init();
	}, []);

	jwtService.on('onAutoLogin', async () => {
		try {
			const user = await jwtService.signInWithToken();
			dispatch(userActions.setUserData(user));
			setWaitAuthCheck(false);
		} catch (error) {
			dispatch(Actions.showMessage({ message: error }));
			setWaitAuthCheck(false);
		}
	});

	jwtService.on('onAutoLogout', message => {
		if (message) dispatch(Actions.showMessage({ message }));
		dispatch(userActions.logoutUser());
		setWaitAuthCheck(false);
	});

	jwtService.on('onNoAccessToken', () => setWaitAuthCheck(false));

	return waitAuthCheck ? (
		<SpacenowSplashScreen />
	) : (
			<React.Fragment children={props.children} />
		);
};

export default Auth;
