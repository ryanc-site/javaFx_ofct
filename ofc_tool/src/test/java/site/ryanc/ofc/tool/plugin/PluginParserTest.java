package site.ryanc.ofc.tool.plugin;

import site.ryanc.ofc.tool.model.PluginJarInfo;

import java.io.File;

public class PluginParserTest {

    public static void main(String[] args) throws Exception {
        String pluginJar = "libs/x-ActiveMqTool-0.0.1.jar";
        PluginParser.parse(new File(pluginJar), new PluginJarInfo());
    }
}