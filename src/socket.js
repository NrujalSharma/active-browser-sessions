const activeUsers = new Map()

exports.myFunc = io => {
  io.on('connection', (socket) => {
    console.log('connection request')
    let currentRoom = ''
    const room = socket.request._query.application
    const increment = socket.request._query.increment
    console.log(increment)
    socket.join(room)

    if (activeUsers.has(room)) {
      let userCount = activeUsers.get(room)
      console.log(userCount)
      if (increment == 'true') {
        userCount++
        activeUsers.set(room, userCount)
        io.of('/').to(room).emit('user-join', userCount)
      } else {
        io.of('/').to(room).emit('user-join', userCount)
      }
      console.log(userCount)
    } else {
      activeUsers.set(room, 1)
      io.of('/').to(room).emit('user-join', 1)
    }
    currentRoom = room

    socket.on('decrement-user', () => {
      const userCount = activeUsers.get(currentRoom) - 1
      activeUsers.set(currentRoom, userCount)
      io.of('/').to(currentRoom).emit('user-leave', userCount)
    })
  })
}
