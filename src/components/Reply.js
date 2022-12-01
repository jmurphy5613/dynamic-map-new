import React, { Fragment } from "react";
import moment from "moment";
import { getRelationshipText } from "../helpers";

function Reply(props) {
    const content = props.content;
    const admin = props.admin;
    console.log(props);

    return (
        <Fragment>
            {!content.hidden && (
                <div className="replyPop">
                    <h3 className="commentContent">{content.comment}</h3>
                    <div className="replyDetails">
                        {admin && (
                            <button
                                className="hide button--admin"
                                onClick={() =>
                                    props.hideReply(
                                        props.commentId,
                                        props.replyId
                                    )
                                }
                            >
                                Hide
                            </button>
                        )}
                        <div className="replyByDetails">
                            <p className="commentBy">
                                {"by "}
                                {content.commentBy || "Anonymous"}
                                {"  "}
                                {moment(content.submittedOn).fromNow()}
                            </p>
                            <p className="commentAbout">
                                {getRelationshipText(
                                    content.live,
                                    content.work,
                                    content.visit
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Reply;
