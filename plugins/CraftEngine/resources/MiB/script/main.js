//@Subscribe(org.bukkit.event.player.PlayerJoinEvent)
function onJoin(event) {
    org.bukkit.Bukkit.broadcastMessage(
        event.getPlayer().getName() + " joined the server!"
    );
}