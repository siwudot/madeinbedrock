//@Subscribe(org.bukkit.event.block.BlockBreakEvent, priority: HIGH, ignoreCancelled: true)
function onBreak(event) {
    event.player.sendMessage("H")
}