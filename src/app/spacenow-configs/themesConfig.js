import spacenowLight from '@spacenow/spacenow-colors';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const themesConfig = {
	default: {
		palette: {
			type: 'light',
			primary: spacenowLight,
			secondary: {
				light: blue[400],
				main: blue[600],
				dark: blue[700],
			},
			error: red,
		},
		status: {
			danger: 'orange',
		},
	},
};

export default themesConfig;
