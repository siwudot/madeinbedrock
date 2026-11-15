addCommand("clearChat", {
  onCommand: function(sender) {
    for (var i = 1; i < 100; i++) {
      sender.sendMessage(i);
    }
  }
});