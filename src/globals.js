import * as L from "leaflet";

//Firebase settings

export const firebaseConfig = {
    apiKey: "AIzaSyDIcdQcyKwLlK2UzWIypC33t8ZmiKrk1Fo",
    authDomain: "pidc-industrial.firebaseapp.com",
    databaseURL: "https://pidc-industrial-default-rtdb.firebaseio.com",
    projectId: "pidc-industrial",
    storageBucket: "pidc-industrial.appspot.com",
    messagingSenderId: "796240446853",
    appId: "1:796240446853:web:b7786caa198b13a784b0ec",
    measurementId: "G-225L34R2W7",
};

//icons

export const iconTypes = ["climate", "accessibility", "vibrancy", "community", "engagement"]

//icons that are loaded on each user end on first load
export const icons = {
    climate: L.Icon.extend({
        options: {
            iconUrl:
                "https://www.ibm.com/brand/experience-guides/developer/b1db1ae501d522a1a4b49613fe07c9f1/01_8-bar-positive.svg",
            iconAnchor: new L.Point(38, 18),
            iconSize: new L.Point(76, 76),
        },
    }),

    accessibility: L.Icon.extend({
        options: {
            iconUrl: "./icons/equity.png",
            iconAnchor: new L.Point(38, 18),
            iconSize: new L.Point(75, 75),
        },
    }),
    vibrancy: L.Icon.extend({
        options: {
            iconUrl: "./icons/vibrancy.png",
            iconAnchor: new L.Point(38, 22),
            iconSize: new L.Point(75, 75),
        },
    }),
    community: L.Icon.extend({
        options: {
            iconUrl: "./icons/community.png",
            iconAnchor: new L.Point(38, 22),
            iconSize: new L.Point(75, 75),
        },
    }),
    engagement: L.Icon.extend({
        options: {
            iconUrl: "./icons/transparency.png",
            iconAnchor: new L.Point(38, 22),
            iconSize: new L.Point(75, 75),
        },
    }),
};

//icons 