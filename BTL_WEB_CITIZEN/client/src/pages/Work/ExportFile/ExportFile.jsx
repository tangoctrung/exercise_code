import React, { useRef } from 'react';
import { DeclarationForm } from '../../../components/DeclarationForm/DeclarationForm';
import './ExportFile.css';
import { useReactToPrint } from "react-to-print";
import ReactToPrint from 'react-to-print';

function ExportFile() {

    const fileRef = useRef();

    // khi người dùng click in phiếu
    const handleClickToPrint = useReactToPrint({
        content: () => fileRef.current,
      });

    return (
        <div className="exportFile">
            <div className="exportFile-top">
                <div className="exportFile-list">
                    <div className="exportFile-item">
                        <p onClick={handleClickToPrint}>
                            <i className="fas fa-print"></i> In phiếu
                        </p>
                    </div>
                </div>
            </div>
            <div className="exportFile-bottom">
                <div className="exportFile-content" ref={fileRef}>
                    <DeclarationForm  />
                </div>
            </div>
        </div>
    )
}
{/* <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} />
    </div> */}

export default ExportFile;
