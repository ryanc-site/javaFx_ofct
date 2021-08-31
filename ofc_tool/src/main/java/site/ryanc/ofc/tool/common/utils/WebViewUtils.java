package site.ryanc.ofc.tool.common.utils;

import java.lang.reflect.Constructor;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javafx.scene.Scene;
import javafx.scene.control.Tab;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import lombok.Setter;
import site.ryanc.ofc.tool.controller.index.IndexController;
import site.ryanc.ofc.tool.controller.ofct.webview.Browser;

/**
 * 功能描述
 *
 * @author cWX993443
 * @since 2021-07-25
 */
@Setter
public class WebViewUtils {

    private static final Logger log = LoggerFactory.getLogger(WebViewUtils.class);

    public static<T> void getNewWebPage(String title, String icon, String newWebPage, String webViewClasName,
                                      Class appClass,boolean isNewStage,IndexController indexController) {
        Browser browser = null;
        try {
            Class webCls = Class.forName(webViewClasName);
            Constructor webCtor = webCls.getConstructor(String.class, Class.class);
            browser = (Browser) webCtor.newInstance(newWebPage, appClass);
        } catch (Exception e) {
            log.error("credit Browser({}),fail.e={}", webViewClasName, e);
        }

        Scene scene = new Scene(browser, 1200, 800, Color.web("#666970"));
        Image iconView = StringUtils.isNotEmpty(icon) ? new Image(icon) : new Image("/images/crcb_icon.png");
        if(isNewStage){
            Stage newStage = new Stage();
            newStage.setTitle(title);
            newStage.setResizable(true);
            newStage.setScene(scene);
            newStage.getIcons().add(iconView);
            newStage.show();
        }else{
            Tab tab = new Tab(title);
            ImageView imageView = new ImageView(iconView);
            imageView.setFitHeight(18);
            imageView.setFitWidth(18);
            tab.setGraphic(imageView);
            tab.setContent(browser);
            indexController.getTabPaneMain().getTabs().add(tab);
            indexController.getTabPaneMain().getSelectionModel().select(tab);
        }

    }
}