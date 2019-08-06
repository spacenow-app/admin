import spacenowLight from '@spacenow/spacenow-colors';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

const themesConfig = {
    default    : {
        palette: {
            type     : 'light',
            primary  : spacenowLight,
            secondary: {
                light: lightBlue[400],
                main : lightBlue[600],
                dark : lightBlue[700]
            },
            error    : red
        },
        status : {
            danger: 'orange'
        }
    }
};

export default themesConfig;
