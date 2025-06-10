import { Provider } from "react-redux";
import { AppContextProvider } from "./context/AppContext";
import store from "./store/store";
import { AppRouter } from "./constants/appRoutes";

function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <AppRouter />
      </AppContextProvider>
    </Provider>
  );
}

export default App;
