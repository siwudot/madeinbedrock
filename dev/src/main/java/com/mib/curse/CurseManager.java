package com.mib.curse;

import com.mib.Main;
import org.bukkit.entity.Player;
import org.bukkit.potion.PotionEffect;
import org.bukkit.potion.PotionEffectType;

public class CurseManager {

    private final Main plugin;

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
        player.setHealth(0);
    }
}
