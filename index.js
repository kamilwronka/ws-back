var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

let position = {
  x: 0,
  y: 0
};

let players = {};

io.on("connection", function(socket) {
  console.log("a user connected");
  players[socket.id] = position;
  socket.emit("onlineplayers", players);

  console.log(players);

  socket.on("move", data => {
    switch (data.direction) {
      case "left":
        players[socket.id].x = players[socket.id].x - 1;
        break;
      case "right":
        players[socket.id].x = players[socket.id].x + 1;
        break;
      case "up":
        players[socket.id].y = players[socket.id].y + 1;
        break;
      case "down":
        players[socket.id].y = players[socket.id].y - 1;
        break;
      default:
    }
    io.emit("move", position);
  });
  socket.on("disconnect", () => {
    delete players[socket.id];
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
