import React from 'react';
import "./DeclarationForm.css";


// export const ComponentToPrint = React.forwardRef((props, ref) => {
//     return (
//       <div ref={ref}>My cool content here!</div>
//     );
//   });
export const DeclarationForm = React.forwardRef((props, ref) => {
    return (
        <div className="declarationForm" ref={ref}>
            <h1>Phiếu khảo sát dân số</h1>
            <i>Hãy điển đầy đủ thông tin(nếu có) vào form dưới đây.</i>
            <h3>Thông tin cơ bản</h3>
            <div className="declarationForm-infoBasic">
                <div className="declarationForm-img">
                    <div className="declarationForm-img-content">
                        <p>Ảnh 4x6</p>
                    </div>
                </div>
                <div className="declarationForm-listInfo">
                    <div className="declarationForm-itemInfo">
                        <b>Họ và tên: </b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Ngày sinh: </b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Giới tính</b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Dân tộc: </b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Tôn giáo: </b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Học vấn</b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>SĐT: </b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Số CCCD: </b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Email</b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Công việc: </b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Quê quán: </b> 
                        <span></span>
                    </div>
                    <div className="declarationForm-itemInfo">
                        <b>Nơi ở: </b> 
                        <span></span>
                    </div>
                </div>
            </div>
            <h3>Thông tin chi tiết hơn <i>(Ví dụ như: chiều cao, cân nặng, hoạt động trong những năm gần đây, đặc điểm nhận dạng,...)</i></h3>
            <div className="declarationForm-infoDetail">
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </div>
            <h3>Thông tin gia đình <i>(Thông tin về bố mẹ, anh chị em(nếu có): bao gồm tên, tuổi, công việc,...)</i></h3>
            <div className="declarationForm-infoDetail">
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </div>
            <p>--Hết--</p>
        </div>
    )
});

