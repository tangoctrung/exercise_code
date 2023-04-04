const Citizen = require('../model/citizenModel');
const Census = require('../model/censusModel');
const Code = require('../model/codeModel');
const validator = require('validator');
const moment = require('moment');


// khai báo thông tin của một người dân
const AddCitizen = async (req, res) => {
    const { name, numCCCD, education, nation, religion,
        phone, email, avatar, date, job, addressCity, addressDistrict, addressWard, addressVillage,
        hometownCity, hometownDistrict, hometownWard, gender, infoDetail, infoFamily, hometownVillage,
        codeArea, //mã của vùng mở cuộc điều tra dân số
        timeAdd, // thời gian lúc thêm citizen
        typeAccount, // loại tải khoản của người chỉnh sửa
    } = req.body;

    try {
        // kiểm tra xem còn trong thời gian khai báo dân số không
        if (typeAccount !== "A1") {
            const code = await Code.findOne({code: codeArea});
            if (!code) {
                return res.json({
                    status: false,
                    message: "Địa phương này không tồn tại.",
                })
            } else {
    
                if (!code.statusCensus || code.isComplete) {
                    return res.json({
                        status: false,
                        message: "Bạn không có quyền chỉnh sửa nữa.",
                    })
                }

                if (moment(timeAdd).format("YYYY-MM-DD") < moment(code.timeOpen).format("YYYY-MM-DD")) {
                    return res.json({
                        status: false,
                        message: "Cuộc khảo sát dân số chưa được mở.",
                    })
                }
    
                if (moment(timeAdd).format("YYYY-MM-DD") > moment(code.timeClose).format("YYYY-MM-DD")) {
                    return res.json({
                        status: false,
                        message: "Đã quá hạn thời gian khảo sát dân số, bạn không thể chỉnh sửa gì được nữa.",
                    })
                }
            }
        }

        // kiểm tra xem thông tin về tên có dài quá không
        if (name.length > 30 ) {
            return res.json({
                status: false,
                message: "Thông tin về tên của công dân không hợp lệ"
            })
        }
        // kiểm tra xem số CCCD đã tồn tại hay chưa
        const citizen = await Citizen.findOne({numCCCD: numCCCD});
        if (citizen ) {
            // đã tồn tại số CCCD 
            return res.json({
                status: false,
                message: "Số CCCD của công dân này đã tồn tại, hoặc bị sai, vui lòng kiểm tra lại.",
            })
        }
        // kiểm tra xem địa chỉ email hợp lệ không
        if (email !=="") {
            if (!validator.isEmail(email))
            return res.json({
                status: false,
                message: "Địa chỉ email của công dân không hợp lệ, vui lòng kiểm tra lại.",
            })
        }
        // kiểm tra xem ngày sinh có hợp lệ không
        if (date > Date.now()) {
            return res.json({
                status: false,
                message: "Ngày sinh của công dân không hợp lệ, vui lòng xem lại.",
            })
        }


        // nếu tất cả thông tin hợp lệ thì lưu citizen vào database
        const newCitizen = new Citizen({
            name, numCCCD, education, nation, religion,
            phone, email: email ? email : "", avatar, date, job, addressCity, addressDistrict, addressWard, addressVillage,
            hometownCity, hometownDistrict, hometownWard, hometownVillage, gender, infoDetail, infoFamily,
        });
        await newCitizen.save();

        res.json({status: true, message: "Công dân đã được lưu thành công"});
    } catch (err) {
        res.status(500).json(err);
    }
}

// cập nhật thông tin cho 1 công dân có numCCCD
const UpdateCitizen = async (req, res) => {
    const userId = req.params.id;
    const { 
         _id, createdAt, updatedAt,
         name, education, nation, religion, phone, email, avatar, date, job, gender,
         numCCCD, infoDetail, infoFamily, hometownCity, hometownDistrict, hometownWard, hometownVillage, addressCity, addressDistrict, addressWard, addressVillage,
        codeArea, //mã của vùng mở cuộc điều tra dân số
        timeAdd, // thời gian lúc thêm citizen
    } = req.body;
    const data = {
        name, education, nation, religion, phone, email, avatar, date, job, gender,
        numCCCD, infoDetail, infoFamily, hometownCity, hometownDistrict, hometownWard, hometownVillage, addressCity, addressDistrict, addressWard, addressVillage,
    }
    const typeAccount = req.typeAccount;
    // kiểm tra xem còn trong thời gian khai báo dân số không
    if (typeAccount !== "A1") {
        const code = await Code.findOne({code: codeArea});
        if (!code) {
            return res.json({
                status: false,
                message: "Bạn không thể sửa đổi thông tin công dân này.",
            })
        } else {

            if (!code.statusCensus || code.isComplete) {
                return res.json({
                    status: false,
                    message: "Bạn không có quyền chỉnh sửa nữa.",
                })
            }

            if (moment(timeAdd).format("YYYY-MM-DD") < moment(code.timeOpen).format("YYYY-MM-DD")) {
                return res.json({
                    status: false,
                    message: "Cuộc khảo sát dân số chưa được mở.",
                })
            }

            if (moment(timeAdd).format("YYYY-MM-DD") > moment(code.timeClose).format("YYYY-MM-DD")) {
                return res.json({
                    status: false,
                    message: "Đã quá hạn thời gian khảo sát dân số, bạn không thể chỉnh sửa gì được nữa.",
                })
            }
        }
    }

    try {
        const citizenNew = await Citizen.findByIdAndUpdate({_id: userId}, data, {new: true});
        res.json({
            status: true, 
            message: "Dữ liệu của công dân này đã được cập nhật thành công.",
            data: citizenNew,
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

// xóa thông tin của công dân có số CCCD
const DeleteCitizen = async (req, res) => {
    const userId = req.params.id;
    const typeAccount = req.typeAccount;
    // kiểm tra xem còn trong thời gian khai báo dân số không
    if (typeAccount !== "A1") {
        const codeArea = req.accountName.slice(0, req.accountName.length - 2);
        const code = await Code.findOne({code: codeArea});
        if (!code) {
            return res.json({
                status: false,
                message: "Địa phương này không tồn tại.",
            })
        } else {

            if (!code.statusCensus || code.isComplete) {
                return res.json({
                    status: false,
                    message: "Bạn không có quyền chỉnh sửa nữa.",
                })
            }

            if (moment(timeAdd).format("YYYY-MM-DD") < moment(code.timeOpen).format("YYYY-MM-DD")) {
                return res.json({
                    status: false,
                    message: "Cuộc khảo sát dân số chưa được mở.",
                })
            }

            if (moment(timeAdd).format("YYYY-MM-DD") > moment(code.timeClose).format("YYYY-MM-DD")) {
                return res.json({
                    status: false,
                    message: "Đã quá hạn thời gian khảo sát dân số, bạn không thể chỉnh sửa gì được nữa.",
                })
            }
        }
    }
    try {
        await Citizen.findByIdAndDelete({_id: userId});
        res.json({
            status: true, 
            message: "Dữ liệu của công dân này đã bị xóa."
        })

    } catch (err) {
        res.status(500).json(err);
    }
}

// lấy tất cả thông tin của tất cả công dân
const getAllCitizen = async (req, res) => {
    try {
        const citizens = await Citizen.find();
        res.json({
            status: true, 
            message: "Lấy dữ liệu của tất cả công dân thành công.",
            citizens,
        })

    } catch (err) {
        res.status(500).json(err);
    }
}

// lấy tất cả công dân theo một vùng quê quán có code nào đó
const getAllCitizenCode = async (req, res) => {
    const codeName = req.query.codeName;
    const level = req.query.level;
    // console.log(codeName, level);
    // console.log(req.accountName, req.typeAccount);
    // kiểm tra xem người dùng có thể lấy dữ liệu từ codeName này không
    try {
        let citizens = null;
        if (level === "Tỉnh") {
            citizens = await Citizen.find({"hometownCity": codeName});
        } else if (level === "Huyện") {
            citizens = await Citizen.find({"hometownDistrict": codeName});
        } else if (level === "Xã") {
            citizens = await Citizen.find({"hometownWard": codeName});
        } else if (level === "Thôn") {
            citizens = await Citizen.find({"hometownVillage": codeName});
        } 
        
        if (!citizens.length > 0) {
            return res.json({
                status: false,
                message: "Không tìm thấy dữ liệu",
                citizens: [],
            })
        }
        
        res.json({
            status: true, 
            message: "Lấy dữ liệu của tất cả công dân thành công.",
            citizens,
        })

    } catch (err) {
        res.status(500).json(err);
    }
}

const getCitizenManyCode = async (req, res) => {
    const codeName = req.query.codeName.split(",");
    const level = req.query.level;
    // kiểm tra xem người dùng có thể lấy dữ liệu từ codeName này không
    let citizens = [];
    try {
        if (level === "Tỉnh") {
            citizens = await Citizen.find({"hometownCity": {$in: codeName}});
        } else if (level === "Huyện") {            
            citizens = await Citizen.find({"hometownDistrict": {$in: codeName}});
        } else if (level === "Xã") {
            citizens = await Citizen.find({"hometownWard": {$in: codeName}});
        } else if (level === "Thôn") { 
            citizens = await Citizen.find({"hometownVillage": {$in: codeName}});
        } 
        if (!citizens.length > 0) {
            return res.json({
                status: false,
                message: "Không tìm thấy dữ liệu",
                citizens: [],
            })
        }
        
        res.json({
            status: true, 
            message: "Lấy dữ liệu của tất cả công dân thành công.",
            citizens,
        })

    } catch (err) {
        res.status(500).json(err);
    }
}

// lấy thông tin của 1 công dân với số CCCD
const getCitizenNumCCCD = async (req, res) => {
    let numCCCD = req.query.numCCCD;

    try {
        // nếu tìm kiếm theo numCCCD citizen
        if (numCCCD) {
            const citizen = await Citizen.findOne({numCCCD: numCCCD});
            if (citizen) {
                return res.json({
                    status: true, 
                    message: "Lấy dữ liệu của tất cả công dân thành công.",
                    data: [citizen],
                })
            }
            return res.json({
                status: false, 
                message: "Không tìm thấy dữ liệu.",
                data: [],
            });
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

// lấy thông tin của 1 công dân với userId
const getCitizenId = async (req, res) => {
    const citizenId = req.params.id;

    try {
        // nếu tìm kiếm theo id của citizen
        const citizen = await Citizen.findById({_id: citizenId});
        return res.json({
            status: true,
            message: "Lấy dữ liệu thành công",
            data: citizen,
        })

    } catch (err) {
        res.status(500).json(err);
    }
}

// lấy công dân theo tỉ lệ nam nữ của một vùng nào đó
const getCitizenGender = async (req, res) => {
    let name = req.query.codeName; // tên vùng muốn xem
    let codeName = null;
    if (name.includes(",")){
        codeName = name.split(",");
    } else {
        codeName = [name];
    }
    if (req.typeAccount !== "A1") {
        const newCode = await Code.find({"name": {$in: codeName}});
        let index = 0;
        newCode.forEach((code) => {
            const code1 = code.code;
            const codeUser = req.accountName;
            if (code1.slice(0, codeUser.length) !== codeUser) {
                index = index + 1;
            }
        })
        if (index > 0) {
            return res.json({
                status: false,
                message: "Bạn không có quyền xem dữ liệu của địa phương này."
            })
        }
    }
    const level = req.query.level;  // level của vùng đó: tỉnh, huyện, xã, thôn
    try {
        let citizens = null;
        if (level === "Tỉnh") {
            citizens = await Citizen.find({"hometownCity": { $in : codeName}});
        } else if (level === "Huyện") {
            citizens = await Citizen.find({"hometownDistrict": { $in : codeName}});
        } else if (level === "Xã") {
            citizens = await Citizen.find({"hometownWard": { $in : codeName}});
        } else if (level === "Thôn") {
            citizens = await Citizen.find({"hometownVillage": { $in : codeName}});
        } 
        // nếu không có dữ liệu nào
        if (!citizens.length > 0) {
            return res.json({
                status: false,
                message: "Không tìm thấy dữ liệu",
                citizens: [],
            })
        }

        // nếu có dữ liệu sẽ phân tích theo tỉ lệ nam/nữ
        let dataGender = {
            nam: {name: "Nam", quantity: 0}, nu: {name: "Nữ", quantity: 0}, khac: {name: "Khác", quantity: 0},
        }
        citizens.forEach((citizen) => {
            if (citizen.gender ==="Nam") dataGender.nam.quantity += 1;
            if (citizen.gender ==="Nữ") dataGender.nu.quantity += 1;
            if (citizen.gender ==="Khác") dataGender.khac.quantity += 1;
        })

        return res.json({
            status: true,
            message: "Lấy dữ liệu thành công.",
            data: dataGender,
        })
        
        
    } catch (err) {
        res.status(500).json({err});
    }
}

// lấy công dân theo tỉ lệ độ tuổi của một vùng nào đó
const getCitizenAge = async (req, res) => {
    let name = req.query.codeName; // tên vùng muốn xem
    let codeName = null;
    if (name.includes(",")){
        codeName = name.split(",");
    } else {
        codeName = [name];
    }
    if (req.typeAccount !== "A1") {
        const newCode = await Code.find({"name": {$in: codeName}});
        let index = 0;
        newCode.forEach((code) => {
            const code1 = code.code;
            const codeUser = req.accountName;
            if (code1.slice(0, codeUser.length) !== codeUser) {
                index = index + 1;
            }
        })
        if (index > 0) {
            return res.json({
                status: false,
                message: "Bạn không có quyền xem dữ liệu của địa phương này."
            })
        }
    }
    const level = req.query.level;  // level của vùng đó: tỉnh, huyện, xã, thôn
    try {
        let citizens = null;
        if (level === "Tỉnh") {
            citizens = await Citizen.find({"hometownCity": { $in : codeName}});
        } else if (level === "Huyện") {
            citizens = await Citizen.find({"hometownDistrict": { $in : codeName}});
        } else if (level === "Xã") {
            citizens = await Citizen.find({"hometownWard": { $in : codeName}});
        } else if (level === "Thôn") {
            citizens = await Citizen.find({"hometownVillage": { $in : codeName}});
        } 
        // nếu không có dữ liệu nào
        if (!citizens.length > 0) {
            return res.json({
                status: false,
                message: "Không tìm thấy dữ liệu",
                citizens: [],
            })
        }

        // nếu có dữ liệu sẽ phân tích theo tỉ lệ dân tộc
        let dataAge = {
            nhunhi: {name: "Tuổi nhũ nhi(0-2 tuổi)", quantity: 0}, aunhi: {name: "Tuổi ấu nhi(3-6 tuổi)", quantity: 0},
            thieunhi: {name: "Tuổi thiếu nhi(7-12 tuổi)", quantity: 0}, vithanhnien: {name: "Tuổi vị thành niên(13-20 tuổi)", quantity: 0},
            thanhnien: {name: "Tuổi thanh niên(21-40 tuổi)", quantity: 0}, trungnien: {name: "Tuổi trung niên(41-60)", quantity: 0},
            caotuoi: {name: "Người cao tuổi(61 trở lên)", quantity: 0},
        };
        citizens.forEach((citizen) => {
            let nowDate = new Date(Date.now()).getFullYear();
            let yearDate = citizen.date.getFullYear();
            if (nowDate - yearDate <= 2) {
                dataAge.nhunhi.quantity += 1;
            } else if (nowDate - yearDate <= 6) {
                dataAge.aunhi.quantity += 1;
            } else if (nowDate - yearDate <= 12 ) {
                dataAge.thieunhi.quantity += 1;
            } else if (nowDate - yearDate <= 20 ) {
                dataAge.vithanhnien.quantity += 1;
            } else if (nowDate - yearDate <= 40 ) {
                dataAge.thanhnien.quantity += 1;
            } else if (nowDate - yearDate <= 60 ) {
                dataAge.trungnien.quantity += 1;
            } else {
                dataAge.caotuoi.quantity += 1;
            }
        })

        return res.json({
            status: true,
            message: "Lấy dữ liệu thành công.",
            data: dataAge,
        })
        
        
    } catch (err) {
        res.status(500).json({err});
    }
}

// lấy công dân theo tỉ lệ dân tộc của một vùng nào đó
const getCitizenNation = async (req, res) => {
    let name = req.query.codeName; // tên vùng muốn xem
    let codeName = null;
    if (name.includes(",")){
        codeName = name.split(",");
    } else {
        codeName = [name];
    }
    if (req.typeAccount !== "A1") {
        const newCode = await Code.find({"name": {$in: codeName}});
        let index = 0;
        newCode.forEach((code) => {
            const code1 = code.code;
            const codeUser = req.accountName;
            if (code1.slice(0, codeUser.length) !== codeUser) {
                index = index + 1;
            }
        })
        if (index > 0) {
            return res.json({
                status: false,
                message: "Bạn không có quyền xem dữ liệu của địa phương này."
            })
        }
    }
    const level = req.query.level;  // level của vùng đó: tỉnh, huyện, xã, thôn
    try {
        let citizens = null;
        if (level === "Tỉnh") {
            citizens = await Citizen.find({"hometownCity": { $in : codeName}});
        } else if (level === "Huyện") {
            citizens = await Citizen.find({"hometownDistrict": { $in : codeName}});
        } else if (level === "Xã") {
            citizens = await Citizen.find({"hometownWard": { $in : codeName}});
        } else if (level === "Thôn") {
            citizens = await Citizen.find({"hometownVillage": { $in : codeName}});
        } 
        // nếu không có dữ liệu nào
        if (!citizens.length > 0) {
            return res.json({
                status: false,
                message: "Không tìm thấy dữ liệu",
                citizens: [],
            })
        }

        // nếu có dữ liệu sẽ phân tích theo tỉ lệ dân tộc
        let dataNation = {
            kinh: {name: "Kinh", quantity: 0}, tay: {name: "Tày", quantity: 0}, thai: {name: "Thái", quantity: 0},
            mong: {name: "Mông", quantity: 0}, hoa: {name: "Hoa", quantity: 0}, khmer: {name: "Khmer", quantity: 0}, 
            nung: {name: "Nùng", quantity: 0}, muong: {name: "Mường", quantity: 0}, dao: {name: "Dao", quantity: 0}, 
            cham: {name: "Chăm", quantity: 0}, khac: {name: "Khác", quantity: 0},
        };
        citizens.forEach((citizen) => {
            if (citizen.nation==="Kinh") dataNation.kinh.quantity = dataNation.kinh.quantity + 1;
            if (citizen.nation==="Tày") dataNation.tay.quantity = dataNation.tay.quantity + 1;
            if (citizen.nation==="Thái") dataNation.thai.quantity = dataNation.thai.quantity + 1;
            if (citizen.nation==="Mông") dataNation.mong.quantity = dataNation.mong.quantity + 1;
            if (citizen.nation==="Hoa") dataNation.hoa.quantity = dataNation.hoa.quantity + 1;
            if (citizen.nation==="Khmer") dataNation.khmer.quantity = dataNation.khmer.quantity + 1;
            if (citizen.nation==="Nùng") dataNation.nung.quantity = dataNation.nung.quantity + 1;
            if (citizen.nation==="Mường") dataNation.muong.quantity = dataNation.muong.quantity + 1;
            if (citizen.nation==="Dao") dataNation.dao.quantity = dataNation.dao.quantity + 1;
            if (citizen.nation==="Chăm") dataNation.cham.quantity = dataNation.cham.quantity + 1;
            if (citizen.nation==="Khác") dataNation.khac.quantity = dataNation.khac.quantity + 1;
        })

        return res.json({
            status: true,
            message: "Lấy dữ liệu thành công.",
            data: dataNation,
        })
        
        
    } catch (err) {
        res.status(500).json({err});
    }
}

// lấy công dân theo tỉ lệ tôn giáo của một vùng nào đó
const getCitizenReligion = async (req, res) => {
    let name = req.query.codeName; // tên vùng muốn xem
    let codeName = null;
    if (name.includes(",")){
        codeName = name.split(",");
    } else {
        codeName = [name];
    }
    if (req.typeAccount !== "A1") {
        const newCode = await Code.find({"name": {$in: codeName}});
        let index = 0;
        newCode.forEach((code) => {
            const code1 = code.code;
            const codeUser = req.accountName;
            if (code1.slice(0, codeUser.length) !== codeUser) {
                index = index + 1;
            }
        })
        if (index > 0) {
            return res.json({
                status: false,
                message: "Bạn không có quyền xem dữ liệu của địa phương này."
            })
        }
    }
    const level = req.query.level;  // level của vùng đó: tỉnh, huyện, xã, thôn
    try {
        let citizens = null;
        if (level === "Tỉnh") {
            citizens = await Citizen.find({"hometownCity": { $in : codeName}});
        } else if (level === "Huyện") {
            citizens = await Citizen.find({"hometownDistrict": { $in : codeName}});
        } else if (level === "Xã") {
            citizens = await Citizen.find({"hometownWard": { $in : codeName}});
        } else if (level === "Thôn") {
            citizens = await Citizen.find({"hometownVillage": { $in : codeName}});
        } 
        // nếu không có dữ liệu nào
        if (!citizens.length > 0) {
            return res.json({
                status: false,
                message: "Không tìm thấy dữ liệu",
                citizens: [],
            })
        }

        // nếu có dữ liệu sẽ phân tích theo tỉ lệ dân tộc
        let dataReligion = {
            khong: {name: "Không", quantity: 0}, phat: {name: "Phật giáo", quantity: 0}, 
            dao: {name: "Đạo giáo", quantity: 0},
            kito: {name: "Ki-tô giáo", quantity: 0}, ando: {name: "Ấn Độ giáo", quantity: 0}, 
            hoi: {name: "Hồi giáo", quantity: 0}, 
            nho: {name: "Nho giáo", quantity: 0}, khac: {name: "Khác", quantity: 0}, 
        };
        citizens.forEach((citizen) => {
            if (citizen.religion==="Không") dataReligion.khong.quantity = dataReligion.khong.quantity + 1;
            if (citizen.religion==="Phật giáo") dataReligion.phat.quantity = dataReligion.phat.quantity + 1;
            if (citizen.religion==="Đạo giáo") dataReligion.dao.quantity = dataReligion.dao.quantity + 1;
            if (citizen.religion==="Ki-tô giáo") dataReligion.kito.quantity = dataReligion.kito.quantity + 1;
            if (citizen.religion==="Ấn Độ giáo") dataReligion.ando.quantity = dataReligion.ando.quantity + 1;
            if (citizen.religion==="Hồi giáo") dataReligion.hoi.quantity = dataReligion.hoi.quantity + 1;
            if (citizen.religion==="Nho giáo") dataReligion.nho.quantity = dataReligion.nho.quantity + 1;
            if (citizen.religion==="Khác") dataReligion.khac.quantity = dataReligion.khac.quantity + 1;
        })

        return res.json({
            status: true,
            message: "Lấy dữ liệu thành công.",
            data: dataReligion,
        })
        
        
    } catch (err) {
        res.status(500).json({err});
    }
}

// lấy công dân theo tỉ lệ trình độ giáo dục của một vùng nào đó
const getCitizenEducation = async (req, res) => {
    let name = req.query.codeName; // tên vùng muốn xem
    let codeName = null;
    if (name.includes(",")){
        codeName = name.split(",");
    } else {
        codeName = [name];
    }
    if (req.typeAccount !== "A1") {
        const newCode = await Code.find({"name": {$in: codeName}});
        let index = 0;
        newCode.forEach((code) => {
            const code1 = code.code;
            const codeUser = req.accountName;
            if (code1.slice(0, codeUser.length) !== codeUser) {
                index = index + 1;
            }
        })
        if (index > 0) {
            return res.json({
                status: false,
                message: "Bạn không có quyền xem dữ liệu của địa phương này."
            })
        }
    }
    const level = req.query.level;  // level của vùng đó: tỉnh, huyện, xã, thôn
    try {
        let citizens = null;
        if (level === "Tỉnh") {
            citizens = await Citizen.find({"hometownCity": { $in : codeName}});
        } else if (level === "Huyện") {
            citizens = await Citizen.find({"hometownDistrict": { $in : codeName}});
        } else if (level === "Xã") {
            citizens = await Citizen.find({"hometownWard": { $in : codeName}});
        } else if (level === "Thôn") {
            citizens = await Citizen.find({"hometownVillage": { $in : codeName}});
        } 
        // nếu không có dữ liệu nào
        if (!citizens.length > 0) {
            return res.json({
                status: false,
                message: "Không tìm thấy dữ liệu",
                citizens: [],
            })
        }

        // nếu có dữ liệu sẽ phân tích theo tỉ lệ trình độ giáo dục
        let dataEducation = {
            nhatre: {name: "Nhà trẻ", quantity: 0}, tieuhoc: {name: "Tiểu học", quantity: 0}, 
            coso: {name: "Trung học cơ sở", quantity: 0},
            phothong: {name: "Trung học phổ thông", quantity: 0}, caodang: {name: "Cao đẳng", quantity: 0}, 
            trungcap: {name: "Trung cấp", quantity: 0}, daihoc: {name: "Đại học", quantity: 0}, 
            thacsi: {name: "Thạc sĩ", quantity: 0}, tiensi: {name: "Tiến sĩ", quantity: 0},
            khac: {name: "Khác", quantity: 0},
        };
        citizens.forEach((citizen) => {
            if (citizen.education==="Nhà trẻ") dataEducation.nhatre.quantity = dataEducation.nhatre.quantity + 1;
            if (citizen.education==="Tiểu học") dataEducation.tieuhoc.quantity = dataEducation.tieuhoc.quantity + 1;
            if (citizen.education==="Trung học cơ sở") dataEducation.coso.quantity = dataEducation.coso.quantity + 1;
            if (citizen.education==="Trung học phổ thông") dataEducation.phothong.quantity = dataEducation.phothong.quantity + 1;
            if (citizen.education==="Cao đẳng") dataEducation.caodang.quantity = dataEducation.caodang.quantity + 1;
            if (citizen.education==="Trung cấp") dataEducation.trungcap.quantity = dataEducation.trungcap.quantity + 1;
            if (citizen.education==="Đại học") dataEducation.daihoc.quantity = dataEducation.daihoc.quantity + 1;
            if (citizen.education==="Khác") dataEducation.khac.quantity = dataEducation.khac.quantity + 1;
            if (citizen.education==="Thạc sĩ") dataEducation.thacsi.quantity = dataEducation.thacsi.quantity + 1;
            if (citizen.education==="Tiến sĩ") dataEducation.tiensi.quantity = dataEducation.tiensi.quantity + 1;
        })

        return res.json({
            status: true,
            message: "Lấy dữ liệu thành công.",
            data: dataEducation,
        })
        
        
    } catch (err) {
        res.status(500).json({err});
    }
}

// lấy công dân theo tỉ lệ ngành nghề của một vùng nào đó
const getCitizenJob = async (req, res) => {
    let name = req.query.codeName; // tên vùng muốn xem
    let codeName = null;
    if (name.includes(",")){
        codeName = name.split(",");
    } else {
        codeName = [name];
    }
    if (req.typeAccount !== "A1") {
        const newCode = await Code.find({"name": {$in: codeName}});
        let index = 0;
        newCode.forEach((code) => {
            const code1 = code.code;
            const codeUser = req.accountName;
            if (code1.slice(0, codeUser.length) !== codeUser) {
                index = index + 1;
            }
        })
        if (index > 0) {
            return res.json({
                status: false,
                message: "Bạn không có quyền xem dữ liệu của địa phương này."
            })
        }
    }
    const level = req.query.level;  // level của vùng đó: tỉnh, huyện, xã, thôn
    try {
        let citizens = null;
        if (level === "Tỉnh") {
            citizens = await Citizen.find({"hometownCity": { $in : codeName}});
        } else if (level === "Huyện") {
            citizens = await Citizen.find({"hometownDistrict": { $in : codeName}});
        } else if (level === "Xã") {
            citizens = await Citizen.find({"hometownWard": { $in : codeName}});
        } else if (level === "Thôn") {
            citizens = await Citizen.find({"hometownVillage": { $in : codeName}});
        } 
        // nếu không có dữ liệu nào
        if (!citizens.length > 0) {
            return res.json({
                status: false,
                message: "Không tìm thấy dữ liệu",
                citizens: [],
            })
        }

        // nếu có dữ liệu sẽ phân tích theo tỉ lệ ngành nghề
        let dataJob = {
            hangkhong: {name: "Hàng không", quantity: 0}, nghethuat: {name: "Nghệ thuật", quantity: 0}, 
            kinhdoanh: {name: "Kinh doanh", quantity: 0},
            phapluat: {name: "Thực thi pháp luật", quantity: 0}, truyenthong: {name: "Truyền thông, xuất bản", quantity: 0}, 
            nganhy: {name: "Ngành y", quantity: 0}, chamsoc: {name: "Chăm sóc khách hàng", quantity: 0}, 
            giaoduc: {name: "Giáo dục, đào tạo", quantity: 0}, congnghe: {name: "Công nghệ", quantity: 0},
            khoahoc: {name: "Nghiên cứu khoa học", quantity: 0}, lamnong: {name: "Làm nông", quantity: 0},
            lamthue: {name: "Làm thuê chân tay", quantity: 0}, hocsinh: {name: "Học sinh, sinh viên", quantity: 0},
            thatnghiep: {name: "Thất nghiệp", quantity: 0}, khac: {name: "Khác", quantity: 0},
        };
        citizens.forEach((citizen) => {
            if (citizen.job==="Hàng không") dataJob.hangkhong.quantity += 1;
            if (citizen.job==="Kinh doanh") dataJob.kinhdoanh.quantity += 1;
            if (citizen.job==="Thực thi pháp luật") dataJob.phapluat.quantity += 1;
            if (citizen.job==="Nghệ thuật") dataJob.nghethuat.quantity += 1;
            if (citizen.job==="Truyền thông, xuất bản") dataJob.truyenthong.quantity += 1;
            if (citizen.job==="Ngành y") dataJob.nganhy.quantity += 1;
            if (citizen.job==="Chăm sóc khách hàng") dataJob.chamsoc.quantity += 1;
            if (citizen.job==="Giáo dục, đào tạo") dataJob.giaoduc.quantity += 1;
            if (citizen.job==="Công nghệ") dataJob.congnghe.quantity += 1;
            if (citizen.job==="Làm thuê chân tay") dataJob.lamthue.quantity += 1;
            if (citizen.job==="Học sinh, sinh viên") dataJob.hocsinh.quantity += 1;
            if (citizen.job==="Thất nghiệp") dataJob.thatnghiep.quantity += 1;
            if (citizen.job==="Khác") dataJob.khac.quantity += 1;
            if (citizen.job==="Làm nông") dataJob.lamnong.quantity += 1;
            if (citizen.job==="Nghiên cứu khoa học") dataJob.khoahoc.quantity += 1;
        })

        return res.json({
            status: true,
            message: "Lấy dữ liệu thành công.",
            data: dataJob,
        })
        
        
    } catch (err) {
        res.status(500).json({err});
    }
}

module.exports = {
    AddCitizen,
    UpdateCitizen,
    DeleteCitizen,
    getAllCitizen,
    getAllCitizenCode,
    getCitizenNumCCCD,
    getCitizenId,
    getCitizenGender,
    getCitizenReligion,
    getCitizenNation,
    getCitizenAge,
    getCitizenEducation,
    getCitizenJob,
    getCitizenManyCode,
}