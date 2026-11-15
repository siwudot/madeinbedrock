package com.mib;

import org.bukkit.plugin.java.JavaPlugin;
import com.mib.listeners.CurseListener;
import com.mib.curse.CurseManager;

public class Main extends JavaPlugin {

    @Override
    public void onEnable() {

        CurseManager curseManager = new CurseManager(this);

        getServer().getPluginManager().registerEvents(
                new CurseListener(curseManager),
                this);
    }

    @Override
    public void onDisable() {
        getLogger().info("Made in Abyss plugin disabled!");
    }
}