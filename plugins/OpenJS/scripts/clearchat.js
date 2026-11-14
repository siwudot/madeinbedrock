addCommand("clearChat", {
  onCommand: function(sender) {
    for (var i = 0; i < 100; i++) {
      sender.sendMessage(" ");
    }
  }
});