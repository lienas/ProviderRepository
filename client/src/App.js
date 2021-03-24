import {Box, Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {brown, lime, red} from "@material-ui/core/colors";
import {ProviderList} from "./components/ProviderList";
import {Header} from "./components/ui/Header";

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
    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Container>
                <Box my={10}>
                    <ProviderList/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
