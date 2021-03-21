import {
    AppBar,
    Box,
    Container,
    createMuiTheme,
    makeStyles,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import {brown, lime} from "@material-ui/core/colors";
import {ProviderList} from "./components/ProviderList";

const theme = createMuiTheme({
        palette: {
            primary: {
                main: lime[800]
            },
            secondary: {
                main: brown[300],
            },
        }
    }
)

const useStyles = makeStyles({
        title: {
            color: "white"
        }
    }
);


function App() {
    const classes = useStyles()
    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar>
                    <Typography className={classes.title}>
                        Provider-Repository
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Box my={20}>
                    <ProviderList/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
