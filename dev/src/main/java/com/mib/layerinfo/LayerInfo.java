package com.mib.layerinfo;

import java.util.HashMap;
import java.util.Map;

import org.bukkit.util.Vector;

public class LayerInfo {
    public static class Layer {
        public final int worldHeight;
        public final Vector lowerEnd;
        public final Vector upperEnd;
        public Layer(int worldHeight, Vector lowerEnd, Vector upperEnd) {
            this.worldHeight = worldHeight;
            this.lowerEnd = lowerEnd;
            this.upperEnd = upperEnd;
        }
    }

    private static final Map<String, Layer> LAYERS = new HashMap<>();

    static {
        LAYERS.put("Layer1", new Layer(278,  new Vector(-164, -512, -245), new Vector(190, 278, 238)));
    }

    public static Layer get(String name) {
        return LAYERS.get(name);
    }
}