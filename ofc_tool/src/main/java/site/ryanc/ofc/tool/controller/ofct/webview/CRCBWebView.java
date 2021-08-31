package site.ryanc.ofc.tool.controller.ofct.webview;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.Worker;
import javafx.geometry.HPos;
import javafx.geometry.VPos;
import lombok.Getter;
import lombok.Setter;
import netscape.javascript.JSObject;
import site.ryanc.ofc.tool.common.utils.WebViewUtils;
import site.ryanc.ofc.tool.controller.ofct.CRCB_App;

/**
 * 功能描述
 *
 * @author Ryan
 * @since 2021-07-25
 */
@Getter
@Setter
public class CRCBWebView extends Browser {

    private static final Logger log = LoggerFactory.getLogger(WebViewUtils.class);

    public CRCBWebView(String webViewPath, Class appClass) {
        webEnging.getLoadWorker().stateProperty().addListener(new ChangeListener<Worker.State>() {
            @Override
            public void changed(ObservableValue<? extends Worker.State> observable, Worker.State oldValue, Worker.State newValue) {
                if (newValue == Worker.State.SUCCEEDED) {
                    JSObject win = (JSObject) webEnging.executeScript("window");
                    try {
                        win.setMember("app", appClass.newInstance());
                    } catch (Exception e) {
                       log.error("creditWebView({}),fail.e={}", CRCB_App.class.getTypeName(),e);
                    }
                }
            }
        });
        webEnging.load(CRCB_App.class.getResource(webViewPath).toExternalForm());
        getChildren().add(webView);
    }

    @Override
    protected void layoutChildren() {
        double w = getWidth();
        double h = getHeight();
        layoutInArea(webView, 0, 0, w, h, 0, HPos.CENTER, VPos.CENTER);
    }
}