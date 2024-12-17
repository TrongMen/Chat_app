import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import BG from "./assets/Images/BG1.jpeg";
// contexts
import SettingsProvider from "./contexts/SettingsContext";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <SettingsProvider>
          <BrowserRouter>
            <div
              style={{
                backgroundImage: `url(${BG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                margin: 0, // Loại bỏ khoảng trắng thừa
                padding: 0, // Loại bỏ khoảng trắng thừa
                display: "flex", // Căn giữa nội dung
                justifyContent: "center", // Căn giữa theo chiều ngang
                alignItems: "center", // Căn giữa theo chiều dọc
              }}
            >
              <App />
            </div>
          </BrowserRouter>
        </SettingsProvider>
      </ReduxProvider>
    </HelmetProvider>
  </React.StrictMode>
);


reportWebVitals();

