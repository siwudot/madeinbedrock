package com.mib.listeners;

import com.mib.curse.CurseManager;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerMoveEvent;

public class CurseListener implements Listener {

    private final CurseManager curseManager;

    public CurseListener(CurseManager curseManager) {
        this.curseManager = curseManager;
    }

    @EventHandler
    public void onPlayerMove(PlayerMoveEvent event) {

        var player = event.getPlayer();

        double velY = player.getVelocity().getY();

        if (velY < -1) {
            curseManager.applyCurse(player);
        } else if (velY < -3) {
            curseManager.killPlayer(player);
        } else {
            curseManager.removeCurse(player);
        }
    }
}