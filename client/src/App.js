import {Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
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

function App() {
  return (
      <ThemeProvider theme={theme}>
          <Container>
              <ProviderList/>
          </Container>
      </ThemeProvider>
  );
}

export default App;
