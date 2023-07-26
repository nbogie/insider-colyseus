import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InsiderApp } from "./components/InsiderApp";
import "./index.css";
import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { ModeToggle } from "./components/ModeToggle";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <CssVarsProvider>
            <CssBaseline />
            <ToastContainer />
            <ModeToggle />
            <InsiderApp />
        </CssVarsProvider>
    </React.StrictMode>
);
