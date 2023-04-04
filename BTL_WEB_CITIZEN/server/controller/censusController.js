const Census = require('../model/censusModel');
const Code = require('../model/codeModel');
var moment = require('moment');

// mở một cuộc điều tra dân số
const openCensus = async (req, res) => {
    const { timeClose, timeOpen, opener} = req.body;
    try {
        // kiểm tra xem người yêu cầu có phải là A1 không
        if (req.typeAccount === "A1") {
            // kiểm tra xem thời gian đóng và thời gian mở có hợp lệ không
            if (timeClose < timeOpen) {
                return res.json({
                    status: false,
                    message: "Thời gian mở cuộc khảo sát không hợp lệ",
                    messageDetail: "Thời gian mở cuộc khảo sát bắt buộc phải nhỏ hơn thời gian kết thúc cuộc khảo sát, nhưng bạn lại để nó lớn hơn.",
                })
            }
            if (timeClose < Date.now()) {
                return res.json({
                    status: false,
                    message: "Thời gian kết thúc khảo sát không hợp lệ",
                    messageDetail: "Thời gian kết thúc cuộc khảo sát bắt buộc phải lớn hơn thời gian hiện tại.",
                })
            }
            const census1 = await Census.findOne({codeArea: "00"});
            if (!census1) {
                // sau khi kiểm tra xong sẽ lưu vào database
                const census = new Census({
                    timeClose, timeOpen, statusCensus: true, codeArea: "00", opener
                })
                const newCensus = await census.save();
                res.send({
                    status: true,
                    message: "Cuộc khảo sát dân số được mở thành công.",
                    data: newCensus,
                })
            } else {
                const newCensus = await census1.updateMany({timeClose, timeOpen, statusCensus: true, codeArea: "00", opener})
                res.send({
                    status: true,
                    message: "Cuộc khảo sát dân số được mở thành công.",
                    data: newCensus,
                })
            }
        } else {
            return res.json({ 
                status: false,
                message: "Chúng tôi nhận thấy bạn đang cố mạo danh để xâm nhập vào hệ thống, hãy dừng lại ngay."
            })
        }

    } catch (err) {
        res.status(500).json({ err});
    }
} 

module.exports = {
    openCensus,
}