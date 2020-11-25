var socketio = require('socket.io')

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.on('connection', function(socket){
        socket.emit("hello", "Hello World")
        socket.on("room", (room)=>{
            socket.join(room)
            io.to(room).emit('joined', `Joined ${room}`)
            socket.on('message', function(msg){
                io.to(room).emit('message', { user_id: msg.user_id, name: socket.id, message: msg.message})
            })
            socket.on('typing', function(){
                io.to(room).emit('typing', 'User is typing')
            })
            socket.on('done typing', function(){
                io.to(room).emit('done typing')
            })
        })
    })
    return io;
}