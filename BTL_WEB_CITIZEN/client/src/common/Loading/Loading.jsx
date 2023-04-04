import React from 'react';
import "./Loading.css";

function Loading({typeLoading, width, height, color}) {
    return (
        <div style={{width: `${width}px`, height: `${height}px`}}>
            
            { typeLoading === "progress" && <div class="progress" style={{color: color}}></div> }

            { typeLoading === "dot" && <div class="dots" style={{color: color}}></div> }

            { typeLoading === "circle" && 
                <svg viewBox="25 25 50 50">
                    <circle cx="50" cy="50" r="20" style={{stroke: color}}></circle>
                </svg>}
            
        </div>
    )
}

export default Loading;
