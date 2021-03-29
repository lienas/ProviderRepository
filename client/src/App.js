import {Box, Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {brown, lime, red} from "@material-ui/core/colors";
import ProviderList from "./components/ProviderList";
import {Header} from "./components/ui/Header";
import {useAuth0} from "@auth0/auth0-react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {EditProvider} from "./components/EditProvider";

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
        <Router>
            <ThemeProvider theme={theme}>
                <Header/>
                <Switch>
                    <Route path="/create">
                        <EditProvider edit={false}/>
                    </Route>
                    <Route path="/edit">
                        <EditProvider edit={true}/>
                    </Route>
                    <Route path="/">
                        <Container>
                            <Box my={5}>
                                {isAuthenticated ?
                                    <ProviderList/> :
                                    <h3>Please login</h3>
                                }
                            </Box>
                        </Container>
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

export default App;
