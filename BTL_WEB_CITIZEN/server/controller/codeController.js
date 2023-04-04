// const User = require('../model/userModel');
const Code = require('../model/codeModel');
const Citizen = require('../model/citizenModel');
const Census = require('../model/censusModel');
const moment = require('moment');


// ADD CODE FOR CITY,...
const addCode = async (req, res) => {
    try {
        const { code, name, provider, level, codeLength, accountNameProvider } = req.body;
        // tìm kiếm xem tên tỉnh thành đã được khai báo hay chưa
        const findCode = await Code.findOne({name: name}).populate("provider", ["name", "position"]);
        if (findCode) {
            return res.send({
                status: false, 
                message: name + " đã được khai báo. Bạn không thể khai báo lại.",
                messageDetail: name + " đã được khai báo với mã " + findCode.code + " vào ngày " 
                    + moment(findCode.createdAt).format('DD/MM/YYYY') + " bởi " + findCode.provider.name 
                    + " (" + findCode.provider.position + ")",
            })
        }
        // tìm kiếm xem mã đã được khai báo hay chưa
        const findCode1 = await Code.findOne({ code: code}).populate("provider", ["name", "position"]);
        if (findCode1) {
            return res.send({
                status: false, 
                message: "Mã " + code + " đã được khai báo. Bạn không thể khai báo lại.",
                messageDetail: "Mã " + code + " đã được khai báo cho " + findCode1.name + " vào ngày " 
                    + moment(findCode1.createdAt).format('DD/MM/YYYY') + " bởi " + findCode1.provider.name 
                    + " (" + findCode1.provider.position + ")",
            })
        }

        // kiểm tra xem code có hợp lệ hay không
        if (![2, 4, 6, 8].includes(code.length)) {
            return res.send({
                status: false, 
                message: "Mã " + code + " không hợp lệ. Vui lòng xem lại",
                messageDetail: "Mã này chỉ có thể có độ dài là 2, 4, 6, 8 (2 là mã tỉnh(thành phố)," + 
                     " 4 là mã huyện(quận), 6 là mã xã(phường), 8 là mã thôn(bản, làng, phố))",
            })
        }
        
        // kiểm tra xem người dùng có đủ thẩm quyền cấp mã không
        if (codeLength !== code.length) {
            // codeLength là độ dài mã mà người dùng được phép cấp
            return res.send({
                status: false, 
                message: "Bạn không đủ thẩm quyền(hoặc không có quyền) cấp mã này.",
                messageDetail: "Với chức vụ của bạn thì bạn chỉ có quyền cấp mã tương ứng có độ dài là " + codeLength,
            })
        }

        // kiểm tra xem code có hợp lệ ko 
        if (accountNameProvider === "A1" && code.length !== 2) {
            return res.send({
                status: false, 
                message: "Bạn không đủ thẩm quyền hoặc không đủ quyền cấp mã này",
                messageDetail: "Bạn chỉ có thể cấp  mã code chi các tỉnh/thành phố, và các mã này có độ dài là 2, nên từ 01->63.",
            })
        } else if (accountNameProvider !== "A1" && code.slice(0, accountNameProvider.length) !== accountNameProvider) {
            return res.send({
                status: false, 
                message: "Mã bạn cấp không đúng.",
                messageDetail: "Mã bạn cấp không nằm trong mã địa phương mà bạn quản lí.(VD: Mã địa phương bạn quản lí là 01, bạn chỉ có thể cấp mã là 0102, 0101,... bạn không thể cấp mã 0201,0202,..)",
            })
        }

        // nếu như cả tỉnh thành và mã đều chưa được khai báo và mã hợp lệ thì lưu vào database
        const newCode = new Code({
            code, name, level, provider,
        })
        await newCode.save();
        res.send({
            status: true,
            message: name + " với mã " + code + " đã được khai báo thành công.",
        });
    

    } catch(err) {
        res.status(500).json(err);
    }
}


// GET ALL CODE TRONG NƯỚC VN (lấy mã tỉnh), MỘT TỈNH (lấy mã huyện), hoặc HUYỆN (lẫy mã xã)
const getAllCode = async (req, res) => {
    try {
        const codeId = req.params.id; // id truyền vào là một code của vùng muốn lấy các vùng con trong vùng đấy
        // nếu yêu cầu lấy tất cả các tỉnh đã được khai báo
        if (codeId === "00") {
            const codes = await Code.find({level: "Tỉnh"}).populate("provider", ["name", "position"]);         
            if (codes.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: codes,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            } 
        }
        // nếu yêu cầu lấy tất cả các huyện trong 1 tỉnh
        if (codeId.length === 2 && codeId !== "00") {
            const codes = await Code.find({level: "Huyện"}).populate("provider", ["name", "position"]);
            const listCode = codes.filter(code => code.code.slice(0, codeId.length) === codeId);
            if (listCode.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listCode,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            }
        }
        // nếu yêu cầu lấy tất cả các xã trong 1 huyện
        if (codeId.length === 4 && codeId !== "00") {
            const codes = await Code.find({level: "Xã"}).populate("provider", ["name", "position"]);
            const listCode = codes.filter(code => code.code.slice(0, codeId.length) === codeId);
            if (listCode.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listCode,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            }
        }
        // nếu yêu cầu lấy tất cả các thôn trong 1 xã
        if (codeId.length === 6 && codeId !== "00") {
            const codes = await Code.find({level: "Thôn"}).populate("provider", ["name", "position"]);
            const listCode = codes.filter(code => code.code.slice(0, codeId.length) === codeId);
            if (listCode.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listCode,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            }
        }
        res.json(codeId);
        
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL CODE TRONG NƯỚC VN (lấy mã tỉnh), MỘT TỈNH (lấy mã huyện), hoặc HUYỆN (lẫy mã xã) trong thời gian khai báo dân số
const getAllCodeOpenCensus = async (req, res) => {
    try {
        // nếu yêu cầu lấy tất cả các tỉnh đã được khai báo
        const codeId = req.params.id;
        const typeAccount = req.typeAccount;
        // kiểm tra xem còn trong thời gian khai báo dân số không
        if (typeAccount === "A1") {
            const code = await Census.findOne({codeArea: "00"});
            if (!code.statusCensus) {
                return res.json({
                    status: false,
                    message: "Không có dữ liệu",
                });
            }
        } else {
            const code = await Code.findOne({code: codeId});
            if (!code.statusCensus) {
                return res.json({
                    status: false,
                    message: "Không có dữ liệu",
                });
            }
        }

        // nếu yêu cầu lấy tất cả các tỉnh
        if (codeId === "00") {
            const codes = await Code.find({level: "Tỉnh"}).populate("provider", ["name", "position"]);         
            if (codes.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: codes,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            } 
        }
        // nếu yêu cầu lấy tất cả các huyện trong 1 tỉnh
        if (codeId.length === 2) {
            const codes = await Code.find({level: "Huyện"}).populate("provider", ["name", "position"]);
            const listCode = codes.filter(code => code.code.slice(0, codeId.length) === codeId);
            if (listCode.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listCode,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            }
        }
        // nếu yêu cầu lấy tất cả các xã trong 1 huyện
        if (codeId.length === 4) {
            const codes = await Code.find({level: "Xã"}).populate("provider", ["name", "position"]);
            const listCode = codes.filter(code => code.code.slice(0, codeId.length) === codeId);
            if (listCode.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listCode,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            }
        }
        // nếu yêu cầu lấy tất cả các thôn trong 1 xã
        if (codeId.length === 6) {
            const codes = await Code.find({level: "Thôn"}).populate("provider", ["name", "position"]);
            const listCode = codes.filter(code => code.code.slice(0, codeId.length) === codeId);
            if (listCode.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listCode,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            }
        }
        res.json(codeId);
        
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL CODE TRONG NƯỚC VN (lấy mã tỉnh), MỘT TỈNH (lấy mã huyện), hoặc HUYỆN (lẫy mã xã)
const getAllCodeAndCitizen = async (req, res) => {
    try {
        const codeId = req.params.id; // id truyền vào là một code của vùng muốn lấy các vùng con trong vùng đấy
        // nếu yêu cầu lấy tất cả các tỉnh đã được khai báo
        if (codeId === "00") {
            const codes = await Code.find({level: "Tỉnh"}).populate("provider", ["name", "position"]);         
            let listData = [];
            if (codes.length > 0) {
                codes.forEach(async (code) => {
                    listData.push({code});
                    const citizens = await Citizen.find({hometownCity: code.name});
                    listData.push({citizens});
                })         
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listData,
                })
            } else {           
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            } 
        }
        // nếu yêu cầu lấy tất cả các huyện trong 1 tỉnh
        if (codeId.length === 2 && codeId !== "00") {
            const codes = await Code.find({level: "Huyện"}).populate("provider", ["name", "position"]);
            const listCode = codes.filter(code => code.code.slice(0, codeId.length) === codeId);
            if (listCode.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listCode,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            }
        }
        // nếu yêu cầu lấy tất cả các xã trong 1 huyện
        if (codeId.length === 4 && codeId !== "00") {
            const codes = await Code.find({level: "Xã"}).populate("provider", ["name", "position"]);
            const listCode = codes.filter(code => code.code.slice(0, codeId.length) === codeId);
            if (listCode.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listCode,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            }
        }
        // nếu yêu cầu lấy tất cả các thôn trong 1 xã
        if (codeId.length === 6 && codeId !== "00") {
            const codes = await Code.find({level: "Thôn"}).populate("provider", ["name", "position"]);
            const listCode = codes.filter(code => code.code.slice(0, codeId.length) === codeId);
            if (listCode.length > 0) {
                return res.json({
                    status: true,
                    message: "Lấy dữ liệu thành công",
                    data: listCode,
                })
            } else {
                return res.json({
                    status: false, 
                    message: "Không có dữ liệu",
                })
            }
        }
        res.json(codeId);
        
    } catch (err) {
        res.status(500).json(err);
    }
}

// mở cuộc điều tra dân số
const openCensusCode = async (req, res) => {
    const { timeClose, timeOpen} = req.body;
    const codeArea = req.accountName;
    try {
        if (req.typeAccount !== "A1") {    
            // kiểm tra xem cấp cao hơn đã mở cuộc khảo sát chưa
            if (codeArea.length === 2) { // khi cấp tỉnh muốn mở cuộc khảo sát thì check xem ông cục dân số đã mở hay chưa.
                const census = await Census.findOne({codeArea: "00"});
                if (!census.statusCensus) {
                    return res.json({
                        status: false,
                        message: "Bạn không thể mở cuộc khảo sát này.",
                        messageDetail: "Lãnh đạo cấp cao hơn bạn chưa mở cuộc khảo sát dân số nên bạn cũng không thể mở cuộc khảo sát dân số này."
                    })
                }
            } else if (codeArea.length === 4) { // khi cấp huyện muốn mở cuộc khảo sát thì check xem ông tỉnh đã mở hay chưa.
                const code = await Code.findOne({code: codeArea.slice(0,2)});
                if (!code.statusCensus) {
                    return res.json({
                        status: false,
                        message: "Bạn không thể mở cuộc khảo sát này.",
                        messageDetail: "Lãnh đạo cấp cao hơn bạn chưa mở cuộc khảo sát dân số nên bạn cũng không thể mở cuộc khảo sát dân số này."
                    })
                }
            } else if (codeArea.length === 6) { // khi cấp xã muốn mở cuộc khảo sát thì check xem ông huyện đã mở hay chưa.
                const code = await Code.findOne({code: codeArea.slice(0,4)});
                if (!code.statusCensus) {
                    return res.json({
                        status: false,
                        message: "Bạn không thể mở cuộc khảo sát này.",
                        messageDetail: "Lãnh đạo cấp cao hơn bạn chưa mở cuộc khảo sát dân số nên bạn cũng không thể mở cuộc khảo sát dân số này."
                    })
                }
            }
            // kiểm tra xem thời gian đóng và thời gian mở đã tồn tại hay chưa 
            if (!timeClose || !timeOpen) {
                return res.json({
                    status: false,
                    message: "Thời gian khai báo đang không hợp lệ.",
                    messageDetail: "Thời gian mở hoặc thời gian kết thúc cuộc khai báo dân số đang bị rỗng(có thể do bạn chưa điền thời gian), hãy xem lại."
                })
            }
            // kiểm tra xem thời gian đóng và thời gian mở có hợp lệ không
            if (timeClose < timeOpen) {
                return res.json({
                    status: false,
                    message: "Thời gian mở cuộc khảo sát không hợp lệ",
                    messageDetail: "Thời gian mở cuộc khảo sát bắt buộc phải nhỏ hơn thời gian kết thúc cuộc khảo sát, nhưng bạn lại để nó lớn hơn.",
                })
            }
            if (moment(timeClose).format("YYYY-MM-DD") < moment(Date.now()).format("YYYY-MM-DD")) {
                return res.json({
                    status: false,
                    message: "Thời gian kết thúc khảo sát không hợp lệ",
                    messageDetail: "Thời gian kết thúc cuộc khảo sát bắt buộc phải lớn hơn thời gian hiện tại.",
                })
            }
    
            // sau khi kiểm tra xong sẽ lưu vào database
            const census = await Code.findOneAndUpdate({code: codeArea}, {timeClose, timeOpen, statusCensus: true}, { new: true});
            res.send({
                status: true,
                message: "Cuộc khảo sát dân số được mở thành công.",
                data: census,
            })
        }
    } catch (e) {
        res.status(500).send({e});
    }
}

// đánh dầu đã hoàn thành cuộc khảo sát dân Số
const completeCensus = async (req, res) => {
    try {
        const accountName = req.accountName;
        if (req.typeAccount !== "A1") {
            // // kiểm tra xem địa phương cấp dưới nó đã hoàn thành khảo sát hay chưa
            // const codes = await Code.find();
            // codes.forEach(code => {
            //     if (code.code.slice(0, accountName.length) === accountName) {
            //         if (!code.isComplete) {
            //             return res.json({
            //                 status: false,
            //                 message: "Có địa phương cấp dưới bạn chưa hoàn thành nên bạn không thể hoàn thành được."
            //             });
            //         }
            //     }
            // })
            await Code.findOneAndUpdate({code: accountName}, {isComplete: true, statusCensus: false});
            res.json({
                status: true,
                message: "Thành công",
            })
        } else {
            await Census.findOneAndUpdate({codeArea: "00"}, {isComplete: true, statusCensus: false});
            res.json({
                status: true,
                message: "Thành công",
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

const editTimeCensus = async (req, res) => {
    const { timeClose, timeOpen} = req.body;
    const codeArea = req.accountName;
    try {
        // kiểm tra xem thời gian đóng và thời gian mở có hợp lệ không
        if (timeClose < timeOpen) {
            return res.json({
                status: false,
                message: "Thời gian mở cuộc khảo sát không hợp lệ",
                messageDetail: "Thời gian mở cuộc khảo sát bắt buộc phải nhỏ hơn thời gian kết thúc cuộc khảo sát, nhưng bạn lại để nó lớn hơn.",
            })
        }
        if (moment(timeClose).format("YYYY-MM-DD") < moment(Date.now()).format("YYYY-MM-DD")) {
            return res.json({
                status: false,
                message: "Thời gian kết thúc khảo sát không hợp lệ",
                messageDetail: "Thời gian kết thúc cuộc khảo sát bắt buộc phải lớn hơn thời gian hiện tại.",
            })
        }
        if (req.typeAccount !== "A1") {      
            // sau khi kiểm tra xong sẽ lưu vào database
            const census = await Code.findOneAndUpdate({code: codeArea}, {timeClose, timeOpen, statusCensus: true}, { new: true});
            res.send({
                status: true,
                message: "Thời gian được chỉnh sửa thành công.",
                data: census,
            })
        } else {
            const census = await Census.findOneAndUpdate({codeArea: "00"}, {timeClose, timeOpen, statusCensus: true}, { new: true});
            res.send({
                status: true,
                message: "Thời gian được chỉnh sửa thành công.",
                data: census,
            })
        }
    } catch (e) {
        res.status(500).send({e});
    }
}

// kiểm tra xem một địa phương nào đó đã hết thới gian khảo sát dân số hay Chưa
const checkTimeCensus = async (req, res) => {
    try {
        // check xem vùng người này quản lí đã hết hạn thời gian khảo sát dân số hay chưa.
        if (req.typeAccount !== "A1") {
            const code = await Code.findOne({code: req.accountName});
            if (code.statusCensus) {
                if (moment(code.timeClose).format("YYYY-MM-DD") < moment(Date.now()).format("YYYY-MM-DD")) {
                    await Code.findOneAndUpdate({code: req.accountName}, {statusCensus: false}, {new: true});
                    return res.json({
                        status: false,
                        type: "finished",
                        message: "Cuộc khảo sát đã hết thời gian.",
                    });
                } else {
                    
                    return res.json({
                        status: true,
                        message: "Chưa hết thời gian khai báo dân số.",              
                        timeClose: moment(code.timeClose).format("YYYY-MM-DD"),
                        timeOpen: moment(code.timeOpen).format("YYYY-MM-DD"),              
                    })
                }
            }
            res.json({
                status: false,
                type: "no exits",
                message: "Cuộc khảo sát không tồn tại. Nó chưa được mở hoặc đã kết thúc.",
            })
        } else {
            const census = await Census.findOne({codeArea: "00"});
            if (census.statusCensus) {
                if (moment(census.timeClose).format("YYYY-MM-DD") < moment(Date.now()).format("YYYY-MM-DD")) {
                    await Census.findOneAndUpdate({census: req.accountName}, {statusCensus: false}, {new: true});
                    return res.json({
                        status: false,
                        type: "finished",
                        message: "Cuộc khảo sát đã hết thời gian.",
                    });
                } else {
                    
                    return res.json({
                        status: true,
                        message: "Chưa hết thời gian khai báo dân số.",              
                        timeClose: moment(census.timeClose).format("DD-MM-YYYY"),
                        timeOpen: moment(census.timeOpen).format("DD-MM-YYYY"),              
                    })
                }
            }
            res.json({
                status: false,
                type: "no exits",
                message: "Cuộc khảo sát không tồn tại. Nó chưa được mở hoặc đã kết thúc.",
            })
        }
    } catch (err) {
        res.status(500).send({err});
    }
}

// kiểm tra xem một vùng có codeName xem cuộc khảo sát dân số đã kết thúc hay chưa
const checkCodeName = async (req, res) => {
    const codeName = req.query.codeName; // tên vùng muốn kiểm tra
    try {
        if (req.typeAccount === "A1") { // nếu người yêu cầu là A1

        } else {
            const code = await Code.findOne({name: codeName});
            if (code.statusCensus) {
                return res.json({
                    status: true,
                    message: "Cuộc khảo sát vẫn chưa kết thúc. Nó sẽ kết thúc vào ngày " + moment(code.timeClose).format('DD-MM-YYYY'),
                    statusCensus: true,
                })
            } else {
                return res.json({
                    status: false,
                    message: "Cuộc khảo sát không tồn tại. Nó chưa được mở hoặc đã kết thúc.",
                    statusCensus: false,
                })
            }
        }
    } catch (err) {
        res.status(500).send({err})
    }
}


module.exports = {
    addCode,
    getAllCode,
    openCensusCode,
    checkTimeCensus,
    getAllCodeAndCitizen,
    checkCodeName,
    editTimeCensus,
    completeCensus,
    getAllCodeOpenCensus,
}