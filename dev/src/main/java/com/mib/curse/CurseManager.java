package com.mib.curse;

import com.mib.Main;
import org.bukkit.entity.Player;
import org.bukkit.potion.PotionEffect;
import org.bukkit.potion.PotionEffectType;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class CurseManager {

    private final Main plugin;

    private final Map<UUID, String> deathMessages = new HashMap<>();

    public CurseManager(Main plugin) {
        this.plugin = plugin;
    }

    public void applyCurse(Player player) {
        player.addPotionEffect(new PotionEffect(
                PotionEffectType.NAUSEA,
                PotionEffect.INFINITE_DURATION,
                255,
                true,
                false));

        player.addPotionEffect(new PotionEffect(
                PotionEffectType.DARKNESS,
                PotionEffect.INFINITE_DURATION,
                255,
                true,
                false));
    }

    public void removeCurse(Player player) {
        player.removePotionEffect(PotionEffectType.NAUSEA);
        player.removePotionEffect(PotionEffectType.DARKNESS);
    }

    public void killPlayer(Player player) {
        deathMessages.put(
                player.getUniqueId(),
                player.getName() + " was claimed by the Curse of the Abyss.");

        player.setHealth(0);
    }

    public void layer1Curse(Player player) {
        player.addPotionEffect(new PotionEffect(
                PotionEffectType.NAUSEA,
                20 * 60,
                255,
                true,
                false));
    }

    public String consumeDeathMessage(UUID uuid) {
        return deathMessages.remove(uuid);
    }
}