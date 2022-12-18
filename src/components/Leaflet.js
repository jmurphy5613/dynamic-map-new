import React, { useState, useEffect, Fragment } from "react";
import firebase from "../firebase.js";
import {
    Map,
    TileLayer,
    LayersControl,
    Marker,
    Popup,
} from "react-leaflet";
import Search from "react-leaflet-search";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import moment from "moment";

import {
    getIcons,
    getRelationshipText,
} from "../helpers";
import Draw from "./Draw";
import Sidepanel from "./Sidepanel";
import PopupComment from "./PopupComment";
import MarkerFilter from "./MarkerFilter";
import Filter from "./Filter";
import "./Leaflet.css";
import { iconTypes } from '../globals'
import { mapboxURL } from '../globals'
import '../globals.css'

function Leaflet(props) {
    const user = props.user;
    const admin = props.admin;
    const icons = getIcons();
    const position = [42.424930, -71.128840];
    const mapStyle = { height: "100vh" };
    const [map, setMap] = useState({});
    const [points, setPoints] = useState({});
    const [comments, setComments] = useState({});
    const [replies, setReplies] = useState({});
    const [filterOpen, setFilter] = useState(false);
    const [climate, setClimate] = useState(true);
    const [accessibility, setAccessibility] = useState(true);
    const [vibrancy, setVibrancy] = useState(true);
    const [community, setCommunity] = useState(true);
    const [engagement, setEngagement] = useState(true);

    const saveData = (firebase) => {
        firebase.database().ref("points").set(points);
        firebase.database().ref("comments").set(comments);
        firebase.database().ref("replies").set(replies);
    };

    useEffect(() => {
        if (!user) {
            firebase
                .auth()
                .signInAnonymously()
                .then(() => {
                    firebase
                        .database()
                        .ref("points")
                        .once("value")
                        .then(function (snapshot) {
                            setPoints(snapshot.val());
                        });

                    firebase
                        .database()
                        .ref("comments")
                        .once("value")
                        .then(function (snapshot) {
                            setComments(snapshot.val());
                        });

                    firebase
                        .database()
                        .ref("replies")
                        .once("value")
                        .then(function (snapshot) {
                            setReplies(snapshot.val());
                        });
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });
        } else {
            firebase
                .database()
                .ref("points")
                .once("value")
                .then(function (snapshot) {
                    setPoints(snapshot.val());
                });

            firebase
                .database()
                .ref("comments")
                .once("value")
                .then(function (snapshot) {
                    setComments(snapshot.val());
                });

            firebase
                .database()
                .ref("replies")
                .once("value")
                .then(function (snapshot) {
                    setReplies(snapshot.val());
                });
        }

        // setPoints({ ...data.points });
        // setComments({ ...data.comments });
        // setReplies({ ...data.replies });
    }, [firebase]);

    //const mapboxSat =
    //    "https://api.mapbox.com/styles/v1/interfacestudio/ckke4pj2z0njj17o5nwco65f5/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50ZXJmYWNlc3R1ZGlvIiwiYSI6ImNqeDNiank1djA4ZGE0OXJ3Nmw5dTEyNWgifQ.YIDGNNi8jg51LdgBOFCkbA";

    const mapboxSat =
          mapboxURL;
    
    //satellite data
    const Basemap =
          "https://api.mapbox.com/styles/v1/landaudesign/ckp77s8iq50q518nuadzoh59x/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFuZGF1ZGVzaWduIiwiYSI6ImNrZ3F4dDIyeTBsMXIyenIzd2EwdnBsZTQifQ.MOBff0ku-Z960ubZPr3b6g";

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });

    const layerAdd = (e) => {
        const cancelButtons = document.querySelectorAll(".popCancel");
        if (cancelButtons) {
            cancelButtons.forEach(function (button) {
                button.addEventListener("click", onClickCancelButton);
            });
        }

        const saveButtons = document.querySelectorAll(".popSave");
        if (saveButtons) {
            saveButtons.forEach(function (button) {
                button.addEventListener("click", onClickSaveButton);
            });
        }
    };

    const onClickSaveButton = function handler(e) {
        e.target.removeEventListener("click", handler);

        e.target.disabled = true;
        const keys = Object.keys(map.leafletElement._layers);
        const layer =
            map.leafletElement._layers[keys[keys.length - 2]];

        const comment = document.getElementById("commentText")
            .value;
        let name = document.getElementById("commentName").value;
        if (name === "") {
            name = "Anonymous";
        }
        /*const neighboorhood = document.getElementById("commentHood")
            .value;*/
        const live = document.getElementById("popLive").checked;
        const work = document.getElementById("popWork").checked;
        const visit = document.getElementById("popVisit").checked;
        const email = document.getElementById("commentEmail").value;

        layer.properties = {};
        const id = "_" + Math.random().toString(36).substr(2, 9);
        layer.properties.id = id;

        layer.properties.comment = comment;
        layer.properties.name = name;
        layer.properties.email = email;
        /*layer.properties.neighboorhood = neighboorhood;*/
        layer.properties.work = work;
        layer.properties.visit = visit;
        layer.properties.live = live;

        layer.options.id = id;

        map.leafletElement.closePopup();

        let shipText = getRelationshipText(live, work, visit);

        const popup = L.popup()
            .setLatLng(layer.getLatLng())
            .setContent(
                `<div class="comment">
                <h3 class="commentContent">` +
                    layer.properties.comment +
                    `</h3>
                <p class="commentBy">
                    by ` +
                    layer.properties.name +
                    `</p>
                <p class="commentDate">` +
                    moment(new Date().toISOString()).fromNow() +
                    `</p>
                <p class="commentAbout">` +
                    shipText +
                    `</p>
                </div>`
            );

        layer.bindPopup(popup);
        layer.openPopup();
        L.zoomSnap = 0;
        let icon = layer.options.icon.options.iconUrl;
        let iconType = ""
        console.log(icon)
        // if (icon.includes("climate")) {
        //     icon = "climate";
        // } else if (icon.includes("accessibility")) {
        //     icon = "accessibility";
        // } else if (icon.includes("vibrancy")) {
        //     icon = "vibrancy";
        // } else if (icon.includes("community")) {
        //     icon = "community";
        // } else {
        //     icon = "engagement";
        // }
        for(const iconTypeString of iconTypes) {
            console.log(iconTypeString, icon)
            if(icon.includes(iconTypeString)) {
                iconType = iconTypeString
            }
        }

        console.log(iconType, icon)
        layer.properties.type = iconType;

        const coords = layer.getLatLng();
        const pointData = {
            lat: coords.lng,
            lng: coords.lat,
            type: iconType,
        };
        if (points) {
            points[layer.properties.id] = pointData;
        }
        //let update = { ...points };
        //setPoints(update);

        const commentData = {
            comment: comment,
            commentBy: name,
            featured: true,
            hidden: false,
            work: work,
            live: live,
            visit: visit,
            submittedOn: new Date().toISOString(),
            upvote: 0,
            type: iconType,
            email: email,
        };
        if (comments) {
            comments[layer.properties.id] = commentData;
        }
        // let update = { ...comments };
        // setComments(update);

        layer.on("click", () => markerClick(id));

        writePoint(layer.properties.id, pointData, commentData);
    }
    const onClickCancelButton = (e) => {
        map.leafletElement.closePopup();

        const keys = Object.keys(map.leafletElement._layers);
        let layer =
            map.leafletElement._layers[keys[keys.length - 1]];
        map.leafletElement.removeLayer(layer);
    }
    const hideComment = (id) => {
        const toggle = comments[id].hidden;

        points[id].hidden = !toggle;
        let update = { ...points };
        setPoints(update);
        comments[id].hidden = !toggle;
        update = { ...comments };
        setComments(update);

        // write to firebase
        var updates = {};
        updates["/comments/" + id + "/"] = comments[id];
        updates["/points/" + id + "/"] = points[id];
        firebase.database().ref().update(updates);
    };
    const featureComment = (id) => {
        const toggle = comments[id].featured;
        comments[id].featured = !toggle;
        const update = { ...comments };
        setComments(update);

        // write to firebase
        var updates = {};
        updates["/comments/" + id + "/"] = comments[id];
        firebase.database().ref().update(updates);
    };
    const hideReply = (id, replyId) => {
        const toggle = replies[id][replyId].hidden;
        replies[id][replyId].hidden = !toggle;
        const update = { ...replies };
        setReplies(update);

        // write to firebase
        var updates = {};
        updates["/replies/" + id + "/" + replyId] = replies[id][replyId];
        firebase.database().ref().update(updates);
    };

    const writePoint = (uid, point, comment) => {
        var updates = {};
        updates["/points/" + uid] = point;
        updates["/comments/" + uid] = comment;
        firebase.database().ref().update(updates);
    };

    const filterClick = (type, active) => {
        if (type === "climate") {
            setClimate(!active);
        } else if (type === "accessibility") {
            setAccessibility(!active);
        } else if (type === "vibrancy") {
            setVibrancy(!active);
        } else if (type === "community") {
            setCommunity(!active);
        } else {
            setEngagement(!active);
        }

        Object.keys(points).map((key) => {
            if (points[key].type === type) {
                points[key].filtered = active;
            }
        });

        const update = { ...points };
        setPoints(update);
    };

    const postReply = (e) => {
        // post reply
        const id = e.target.dataset.id;
        const comment = document.getElementById("replyText").value;
        let name = document.getElementById("replyName").value;
        if (name === "") {
            name = "Anonymous";
        }
        const live = document.getElementById("replyLive").checked;
        const work = document.getElementById("replyWork").checked;
        const visit = document.getElementById("replyVisit").checked;

        const newReply = {
            comment: comment,
            submittedOn: new Date().toISOString(),
            commentBy: name,
            live: live,
            work: work,
            visit: visit,
            hidden: false,
            upvote: 0,
        };

        //update state
        const replyId = "_" + Math.random().toString(36).substr(2, 9);
        if (!replies[id]) {
            replies[id] = {};
        }
        replies[id][replyId] = newReply;
        const update = { ...replies };
        setReplies(update);

        // write to firebase
        var updates = {};
        console.log(newReply)
        updates["/replies/" + id + "/" + replyId] = newReply;
        firebase.database().ref().update(updates);
    };

    const markerClick = (id) => {
        const sideComment = document.querySelector("[data-id=" + id + "]");
        if (sideComment != null) {
            sideComment.scrollIntoView();
        }
    };
    return (
        <Fragment>
            <div id="map-div">
                <Sidepanel comments={comments} points={points} map={map} />
                <Map
                    ref={(ref) => {
                        setMap(ref);
                    }}
                    className="sidebar-map"
                    id="leaflet-map"
                    center={position}
                    zoom={13.5}
                    style={mapStyle}
                    maxZoom={20}
                    onlayeradd={layerAdd}
                >
                    <Search
                        position="topright"
                        showMarker={true}
                        showPopup={false}
                        inputPlaceholder="Search for a location"
                        zoom={13} // Default value is 10
                        providerOptions={{ region: "us" }}
                    />
                    <LayersControl position="bottomright">
                        <LayersControl.BaseLayer name="Streets" checked>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> map by <a href="https://www.landau.design">LANDAU</a> + <a href="http://interface-studio.com/">Interface Studio</a>'
                                url={Basemap}
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Satellite">
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> map by <a href="https://www.landau.design">LANDAU</a> + <a href="http://interface-studio.com/">Interface Studio</a>'
                                url={mapboxSat}
                            />
                        </LayersControl.BaseLayer>
                        
                    </LayersControl>
                    <Draw />

                    {/* <GeoJSON
                        data={boundary}
                        style={{
                            color: "#f26422",
                            fillColor: "none",
                            weight: 1,
                            // dashArray: "20 10",
                        }}
                    /> */}

                    <MarkerClusterGroup showCoverageOnHover={false} disableClusteringAtZoom={18} >
                        {points &&
                            Object.keys(points).length > 0 &&
                            Object.keys(points).map(
                                (id) =>
                                    !points[id].filtered &&
                                    !points[id].hidden && (
                                        <Marker
                                            key={id}
                                            id={id}
                                            position={[
                                                points[id].lng,
                                                points[id].lat,
                                            ]}
                                            icon={new icons[points[id].type]()}
                                            onClick={() => markerClick(id)}
                                        >
                                            {console.log(comments, replies)}
                                            {comments[id] && (
                                                <Popup
                                                    id={id}
                                                    featured={
                                                        comments[id].featured
                                                    }
                                                    reply={false}
                                                >
                                                    <PopupComment
                                                        admin={admin}
                                                        comment={comments[id]}
                                                        replies={replies[id]}
                                                        id={id}
                                                        postReply={postReply}
                                                        hideComment={
                                                            hideComment
                                                        }
                                                        featureComment={
                                                            featureComment
                                                        }
                                                        hideReply={hideReply}
                                                    />
                                                </Popup>
                                            )}
                                        </Marker>
                                    )
                            )}
                    </MarkerClusterGroup>

                    {/* <Filter className="filter" position="topleft">
                        {!filterOpen && (
                            <button
                                className="filter"
                                onClick={() => setFilter(true)}
                                onMouseOver={() => setFilter(true)}
                            >
                                <img alt="" src="/icons/new_filter.png"></img>
                            </button>
                        )}
                        {filterOpen && (
                            <div
                                className="filterList"
                                onMouseLeave={() => setFilter(false)}
                                //onBlur={() => setFilter(false)}
                            >
                                <div className="filterGroup">
                                    <input
                                        type="checkbox"
                                        name="climate"
                                        id="filterClimate"
                                        checked={climate}
                                        onChange={() =>
                                            filterClick("climate", climate)
                                        }
                                    />
                                    <label htmlFor="climate">Climate</label>
                                </div>
                                <div className="filterGroup">
                                    <input
                                        type="checkbox"
                                        name="accessibility"
                                        id="filterAccessibility"
                                        checked={accessibility}
                                        onChange={() =>
                                            filterClick("accessibility", accessibility)
                                        }
                                    />
                                    <label htmlFor="accessibility">Accessibility</label>
                                </div>
                                <div className="filterGroup">
                                    <input
                                        type="checkbox"
                                        name="vibrancy"
                                        id="filterVibrancy"
                                        checked={vibrancy}
                                        onChange={() =>
                                            filterClick("vibrancy", vibrancy)
                                        }
                                    />
                                    <label htmlFor="vibrancy">Vibrancy</label>
                                </div>
                                <div className="filterGroup">
                                    <input
                                        type="checkbox"
                                        name="community"
                                        id="filterCommunity"
                                        checked={community}
                                        onChange={() =>
                                            filterClick("community", community)
                                        }
                                    />
                                    <label htmlFor="community">Community</label>
                                </div>
                                <div className="filterGroup">
                                    <input
                                        type="checkbox"
                                        name="engagement"
                                        id="filterEngagement"
                                        checked={engagement}
                                        onChange={() =>
                                            filterClick("engagement", engagement)
                                        }
                                    />
                                    <label htmlFor="engagement">Engagement</label>
                                </div>
                            </div>
                        )}
                    </Filter> */}
                </Map>
            </div>
        </Fragment>
    );
}

export default Leaflet;