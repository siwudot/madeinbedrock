package com.mib.listeners;

import com.mib.curse.CurseManager;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.PlayerDeathEvent;

public class DeathListener implements Listener {
    private final CurseManager curseManager;

    public DeathListener(CurseManager curseManager) {
        this.curseManager = curseManager;
    }

    @EventHandler
    public void onPlayerDeath(PlayerDeathEvent event) {
        var player = event.getEntity();

        String message = curseManager.consumeDeathMessage(
                player.getUniqueId());

        if (message != null) {
            event.setDeathMessage(message);
        }
    }
}