import React from "react";
import { createRoot } from "react-dom/client";

import "./app-state";
import "./styles/main.scss";
import "./utils/keyboard-intent";
import { Root } from "./root";

const root = createRoot(document.getElementById("app"));

root.render(<Root />);
