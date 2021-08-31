package site.ryanc.ofc.tool.event;

import org.junit.Test;

public class AppEventsTest {

    @Test
    public void testFireEvent() {
        AppEvents.addEventHandler(PluginEvent.PLUGIN_DOWNLOADED, event -> {
            System.out.println("Plugin downloaded: " + event.getPluginJarInfo());
        });

        AppEvents.fire(new PluginEvent(PluginEvent.PLUGIN_DOWNLOADED, null));
    }
}