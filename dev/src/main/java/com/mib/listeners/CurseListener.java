package com.mib.listeners;

import com.mib.curse.CurseManager;

import java.util.Set;

import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerMoveEvent;

import com.mib.layerinfo.LayerInfo;

public class CurseListener implements Listener {

    private final CurseManager curseManager;

    public CurseListener(CurseManager curseManager) {
        this.curseManager = curseManager;
    }

    @EventHandler
    public void onPlayerMove(PlayerMoveEvent event) {
        if (!event.hasChangedPosition()) return;

        var player = event.getPlayer();
        double velY = player.getVelocity().getY();
        var position = player.getLocation().toVector();

        if (position.isInAABB(LayerInfo.get("Layer1").lowerEnd, LayerInfo.get("Layer1").upperEnd)) {
            player.addScoreboardTag("Layer1");
        }

        if (velY < 0) {
            if (velY < -3) {
                curseManager.killPlayer(player);
            } else if (velY < -1) {
                curseManager.applyCurse(player);
            } else {
                curseManager.removeCurse(player);
            }
        }

        Set<String> tags = player.getScoreboardTags();
        if (tags.size() == 0) return;

        if (tags.contains("Layer1") && !position.isInAABB(LayerInfo.get("Layer1").lowerEnd,
                LayerInfo.get("Layer1").upperEnd)) {
            event.getPlayer().sendMessage("You got the layer 1 curse.");
            this.curseManager.layer1Curse(player);
            player.removeScoreboardTag("Layer1");
        }
    }
}