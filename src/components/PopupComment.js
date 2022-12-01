import React, { useState, Fragment } from "react";
import moment from "moment";
import { getRelationshipText } from "../helpers";

import Reply from "./Reply";

function PopupComment(props) {
    const admin = props.admin;
    const comment = props.comment;
    const replies = props.replies;

    let sortedReplies = [];
    if (replies) {
        Object.keys(replies).forEach((key) => {
            replies[key].key = key;
            sortedReplies.push(replies[key]);
        });

        sortedReplies = sortedReplies.sort(function (a, b) {
            return Date.parse(a.submittedOn) - Date.parse(b.submittedOn);
        });
    }

    const [isReplying, setReply] = useState(false);

    const toggleReply = (e) => {
        if (isReplying) {
            props.postReply(e);

            const repliesDiv = e.target.previousSibling.previousSibling;
            repliesDiv.scrollTop = repliesDiv.scrollHeight;
        }
        setReply(!isReplying);
    };

    return (
        <div className="comment">
            <p className="commentType"><b>{comment.type.toUpperCase()}:</b></p>
            <h3 className="commentContent">{comment.comment}</h3>
            <p className="commentBy">
                {"by "}
                {comment.commentBy}
            </p>
            <p className="commentDate">
                {moment(comment.submittedOn).fromNow()}
            </p>
            <p className="commentAbout">
                {getRelationshipText(comment.live, comment.work, comment.visit)}
            </p>

            <div className="postedReplies">
                {comment.featured &&
                    replies &&
                    sortedReplies.map((reply, i) => (
                        <Reply
                            key={i}
                            replyId={reply.key}
                            commentId={props.id}
                            admin={admin}
                            hideReply={props.hideReply}
                            content={{
                                ...reply,
                            }}
                        />
                    ))}
            </div>
            {comment.featured && (
                <Fragment>
                    {isReplying && (
                        <Fragment>
                            <div className="replyControls">
                                
                                <textarea
                                    id="replyText"
                                    className="replyText"
                                    placeholder="Your reply"
                                ></textarea>
                                
                                <div className="replyReason">
                                    <label>
                                        What's your relationship to Medford?
                                    </label>
                                    <div className="replyChecks">
                                        <div className="checkGroup">
                                            <input
                                                id="replyLive"
                                                type="checkbox"
                                            />
                                            <label>Live</label>
                                        </div>
                                        <div className="checkGroup">
                                            <input
                                                id="replyWork"
                                                type="checkbox"
                                            />
                                            <label>Work</label>
                                        </div>
                                        <div className="checkGroup">
                                            <input
                                                id="replyVisit"
                                                type="checkbox"
                                            />
                                            <label>Visit</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="replyName">
                                    <label>What's your name? (optional)</label>
                                    <input id="replyName" type="text" />
                                </div>
                            </div>
                            <button
                                className="postReply button--primary"
                                data-id={props.id}
                                onClick={(e) => toggleReply(e)}
                            >
                                Post Reply
                            </button>
                            <button
                                className="replyCancel"
                                onClick={() => setReply(false)}
                            >
                                Cancel
                            </button>
                        </Fragment>
                    )}
                    {!isReplying && (
                        <button
                            className="postReply button--primary"
                            data-id={props.id}
                            onClick={toggleReply}
                        >
                            Reply
                        </button>
                    )}
                </Fragment>
            )}
            {admin && (
                <div className="admin">
                    <button
                        className="hide button--admin"
                        onClick={() => props.hideComment(props.id)}
                    >
                        {comment.hidden ? "Unhide" : "Hide"}
                    </button>
                    <button
                        className="feature button--admin"
                        onClick={() => props.featureComment(props.id)}
                    >
                        {comment.featured ? "Unfeature" : "Feature"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default PopupComment;
