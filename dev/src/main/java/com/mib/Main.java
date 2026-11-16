package com.mib;

import com.mib.curse.CurseManager;
import com.mib.listeners.CurseListener;
import com.mib.listeners.DeathListener;
import org.bukkit.plugin.java.JavaPlugin;

public class Main extends JavaPlugin {
    @Override
    public void onEnable() {
        getLogger().info("Made in Abyss plugin enabled!");
        
        CurseManager curseManager = new CurseManager(this);

        getServer().getPluginManager().registerEvents(
                new CurseListener(curseManager), this);

        getServer().getPluginManager().registerEvents(
                new DeathListener(curseManager), this);
    }

    @Override
    public void onDisable() {
        getLogger().info("Made in Abyss plugin disabled!");
    }
}