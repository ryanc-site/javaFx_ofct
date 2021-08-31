package site.ryanc.ofc.tool.plugin;

import site.ryanc.ofc.tool.model.PluginJarInfo;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddPluginResult {

    private PluginJarInfo pluginJarInfo;

    private boolean newPlugin;
}
