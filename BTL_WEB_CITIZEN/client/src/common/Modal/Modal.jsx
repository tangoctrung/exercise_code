import React from 'react';
import './Modal.css';

function Modal({children, isOpenModal, setIsOpenModal}) {

    const handleHideModal = () => {
        setIsOpenModal(false);
    }

    return (
        <>
            {isOpenModal && 
                <div className="modal">
                    <div className="modal-content">
                        {children}
                    </div>
                    <div className="modal-bottom" onClick={handleHideModal} title="Nhấn để thoát" >

                    </div>
                </div>
            }
        </>
    )
}

export default Modal;
