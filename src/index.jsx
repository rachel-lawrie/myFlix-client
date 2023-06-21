import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
// Import statement to indicate bundle `./index.scss`
import "./index.scss";
import Container from "react-bootstrap/Container";

const MyFlixApplication = () => {
  return <MainView />;
};

// Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render in the root DOM element
root.render(<MyFlixApplication />);
