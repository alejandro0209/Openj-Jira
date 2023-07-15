import { createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';



export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: grey[300],
        },
        primary: {
            main: '#0D28A5'
        },
        secondary: {
            main: '#19874b'
        },
        error: {
            main: red.A400
        }
    },

    components: {
        MuiAppBar: {
            defaultProps: { elevation: 0 }
        }
    }
});