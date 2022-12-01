import React from "react";
import moment from "moment";
import { getRelationshipText } from "../helpers";

function SideComment(props) {
    const comment = props.comment;
    const map = props.map;
    const latlng = props.latlng;

    function filterLayers(layers, id) {
        return layers.filter(function (layer) {
            if (layer.options) {
                return layer.options.id === id;
            } else {
                return false;
            }
        });
    }

    function commentClick() {
        map.leafletElement.setView(latlng, 18);

        setTimeout(() => {
            const id = comment.id;

            let layers = Object.values(map.leafletElement._layers);
            let layer = filterLayers(layers, id);
            layer = layer[0];

            if (layer) {
                map.leafletElement.setView(layer.getLatLng(), 18);
                layer.openPopup();
            }
            map.leafletElement.setView(latlng, 18);
        }, 300);
    }

    return (
        <div
            className="sideComment"
            data-id={comment.id}
            onClick={commentClick}
        >
            <h3 className="commentType">
                <img
                    className="icon"
                    alt=""
                    src={`/icons/${comment.type}.png`}
                />
                {comment &&
                    comment.type === "climate" && comment.type.toUpperCase()}
                {comment &&
                    comment.type === "accessibility" && comment.type.toUpperCase()}
                {comment &&
                    comment.type === "vibrancy" && comment.type.toUpperCase()}
                {comment &&
                    comment.type === "community" && comment.type.toUpperCase()}
                {comment &&
                    comment.type === "engagement" && comment.type.toUpperCase()}
            </h3>
            <div className="comment">
                <h3 className="commentContent">{comment.comment}</h3>
                <p className="commentBy">
                    {"by "}
                    {comment.commentBy}
                </p>
                <p className="commentDate">
                    {moment(comment.submittedOn).fromNow()}
                </p>
                <p className="commentAbout">
                    {getRelationshipText(
                        comment.live,
                        comment.work,
                        comment.visit
                    )}
                </p>
            </div>
        </div>
    );
}

export default SideComment;
