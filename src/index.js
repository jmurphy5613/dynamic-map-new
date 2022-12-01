import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "../node_modules/leaflet-draw/dist/leaflet.draw.css";
import "../node_modules/sidebar-v2/css/leaflet-sidebar.min.css";
import "../node_modules/react-leaflet-markercluster/dist/styles.min.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
