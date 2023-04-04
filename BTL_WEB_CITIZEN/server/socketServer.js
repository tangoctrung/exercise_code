
let users = [];

// const addUser = (userId, socketId) => {
//     !users.some((user) => user.userId === userId) && users.push({userId, socketId});
// }
// const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId)
// }
// const getUser = (userId) => {
//     return users.find((user) => user.userId === userId)
// }

const socketServer = (socket) =>{
    // khi người dùng kết nối vào scoket server
    console.log("1 user connection");
    // nhận userId và socketId từ người dùng
    socket.on("addUser", ({userId, typeAccount, accountName}) => {
        // addUser(userId, socket.id);
        !users.some((user) => user.userId === userId) && users.push({userId, typeAccount, accountName, socketId: socket.id});
        socket.emit("getUser", users);
    })

    // khi gửi mail và nhận mail
    socket.on("sendMail", (dataMail) => {
        users.forEach(user => {
            if (dataMail.receiver[0] === user.userId) {
                socket.to(user?.socketId).emit("getMail", dataMail);
            }
        })
    });


    // khi người dùng ngắt kết nối
    socket.on("disconnect", () =>{
        users = users.filter((user) => user.socketId !== socket.id)
        socket.emit("getUsers", users);
    })
}

module.exports = socketServer;