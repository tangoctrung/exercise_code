import React from "react";
import "./Button.css";

function Button({ typeButton, text, width, height, fontSize, borderRadius, onClick, title }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${fontSize}px`,
        borderRadius: `${borderRadius}`,
        overflow: 'hidden',
      }}
      title={title}
    >
      
      {typeButton === "normal" && (
        <button onClick={onClick} className="buttonType buttonNormal">
          {text ? text : ""}
        </button>
      )}

      {typeButton === "default" && (
        <>
          <i className="fas fa-sync-alt iconDefault" onClick={onClick}></i> 
        </>
      )}

      {typeButton === "reload" && (
        <button onClick={onClick} className="buttonType buttonReload">
          <i className="fas fa-redo-alt" /> {text ? text : ""}
        </button>
      )}

      {typeButton === "black-white" && (
        <button onClick={onClick} className="buttonType buttonBlackWhite">
          {text ? text : "Button"}
        </button>
      )}

      {typeButton === "love" && (
        <button onClick={onClick} className="buttonType buttonLove">
          <i className="fas fa-heart"></i> {text ? text : ""}
        </button>
      )}

      {typeButton === "upload" && (
        <button onClick={onClick} className="buttonType buttonUpload">
          <i className="fas fa-upload"></i> {text ? text : ""}
        </button>
      )}

      {typeButton === "delete" && (
        <button onClick={onClick} className="buttonType buttonDelete">
          <i className="fas fa-times"></i> {text ? text : ""}
        </button>
      )}

      {typeButton === "edit" && (
        <button onClick={onClick} className="buttonType buttonEdit">
          <i className="fas fa-edit"></i> {text ? text : ""}
        </button>
      )}

      {typeButton === "search" && (
        <button onClick={onClick} className="buttonType buttonSearch">
          <i className="fas fa-search"></i> {text ? text : ""}
        </button>
      )}

      {typeButton === "success" && (
        <button onClick={onClick} className="buttonType buttonSuccess">
          <i className="fas fa-check-double"></i> {text ? text : ""}
        </button>
      )}
    </div>
  );
}

export default Button;
