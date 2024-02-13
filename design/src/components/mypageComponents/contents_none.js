import React from "react";

const comments_none = (props) => {
    return (
        <>
          <div className="non_Div">
          <img className="non_img" src="/svg/fi-rr-cross-small.svg"></img>
            <p className="non_text">{props.text}</p>
          </div>
        </>
    );
}

export default comments_none;