let player = importClass("org.bukkit.entity.Player")
let bukkit = importClass("org.bukkit.Bukkit")
let event = importClass("org.bukkit.event.Event")
let potionEffect = importClass("org.bukkit.potion.PotionEffect")
let potionEffectType = importClass("org.bukkit.potion.PotionEffectType")
let entityDamageEvent = importClass("org.bukkit.event.entity.EntityDamageEvent")
let damageCause = importClass("org.bukkit.event.entity.EntityDamageEvent.DamageCause")
let fixedMetadataValue = importClass("org.bukkit.metadata.FixedMetadataValue")

let plugin = bukkit.getPluginManager().getPlugin("OpenJS")

const fallingSpeedNausea = -1;
const fallingSpeedDeath = -3;

// check player is falling to apply nausea and kill if necessary
registerEvent("org.bukkit.event.player.PlayerMoveEvent", {
    handleEvent: function(event) {
        let player = event.getPlayer();
        if(player.getVelocity().getY() < fallingSpeedNausea) {
            if(player.getVelocity().getY() < fallingSpeedDeath) {
                player.setMetadata("DeathCause", new fixedMetadataValue(plugin, "the Curse of the Abyss"));
                player.setHealth(0.0);
            }
            else {
                if(!player.getActivePotionEffects().contains(potionEffectType.NAUSEA)) {
                    player.addPotionEffect(new potionEffect(potionEffectType.NAUSEA, potionEffect.INFINITE_DURATION, 255, true, false));
                }
                if(!player.getActivePotionEffects().contains(potionEffectType.DARKNESS)) {
                    player.addPotionEffect(new potionEffect(potionEffectType.DARKNESS, potionEffect.INFINITE_DURATION, 1, true, false));
                }
            }
        }
        else {
            player.removePotionEffect(potionEffectType.NAUSEA);
            player.removePotionEffect(potionEffectType.DARKNESS);
        }
    }
})

registerEvent("org.bukkit.event.entity.PlayerDeathEvent", {
    handleEvent: function(event) {
        let victim = event.getEntity();
        if(victim.hasMetadata("DeathCause")) {
            let deathCauses = victim.getMetadata("DeathCause");
            if (deathCauses.size() > 0) event.setDeathMessage(victim.getName() + " was killed by " + deathCauses.get(deathCauses.size() - 1).asString());
            victim.removeMetadata(plugin, "DeathCause");
        }
    }
})

registerEvent("org.bukkit.event.player.PlayerJoinEvent", {
    handleEvent: (event) => {
        const player = event.getPlayer();
        player.sendMessage("Welcome to Made in Bedrock! (in java.)");
        if (!player.hasPlayedBefore()) {
            player.sendMessage("§bHere is some starter food for your journey!");
            const Material = org.bukkit.Material;
            const ItemStack = org.bukkit.inventory.ItemStack;
            player.getInventory().addItem(new ItemStack(Material.BREAD, 16));
        }
    }
})