import React, { useState } from "react";

import "./Options.css";
const Options = props => {

  const handleClick = (option) => {
    props.actionProvider.handleClient(option.answerName)
    props.actionProvider.handleMessageLink(option.answerName)
  }

  return (
    <div className="options">
      <h1 className="options-header">{props.title}</h1>
      <div className="options-container">
        {props.options.map(option => {
          return (
            <div
              className="option-item"
              onClick={() => handleClick(option)}
              key={option.id}//must- to connect the key to vlue on array
            >
              {option.answerName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;