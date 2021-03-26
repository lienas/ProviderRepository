import {Box, Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {brown, lime, red} from "@material-ui/core/colors";
import ProviderList from "./components/ProviderList";
import {Header} from "./components/ui/Header";
import {useAuth0} from "@auth0/auth0-react";

const theme = createMuiTheme({
        palette: {
            primary: {
                main: lime[800],
                contrastText: "#fff"
            },
            secondary: {
                main: brown[300],
            },
            danger: {
                main: red
            }
        }
    }
)

function App() {
    const {isAuthenticated} = useAuth0();
    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Container>
                <Box my={10}>
                    {isAuthenticated ?
                        <ProviderList/> :
                        <h3>Please login</h3>
                    }
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
