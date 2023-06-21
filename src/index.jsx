import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
// Import statement to indicate bundle `./index.scss`
import "./index.scss";
import Container from "react-bootstrap/Container";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
};

// Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render in the root DOM element
root.render(<MyFlixApplication />);
