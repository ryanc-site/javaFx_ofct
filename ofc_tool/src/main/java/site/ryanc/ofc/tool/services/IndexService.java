package site.ryanc.ofc.tool.services;

import site.ryanc.ofc.tool.common.utils.WebViewUtils;
import site.ryanc.ofc.tool.controller.index.IndexController;
import site.ryanc.ofc.tool.common.utils.Config;
import site.ryanc.ofc.tool.common.utils.FxmlUtils;
import com.xwintop.xcore.javafx.dialog.FxAlerts;
import com.xwintop.xcore.util.javafx.JavaFxViewUtil;
import java.util.Locale;
import javafx.event.ActionEvent;
import javafx.scene.Parent;
import javafx.scene.control.Tab;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.BorderPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import lombok.Setter;
import site.ryanc.ofc.tool.controller.ofct.CRCB_App;
import site.ryanc.ofc.tool.controller.ofct.webview.CRCBWebView;

import org.apache.commons.lang3.StringUtils;

@Setter
public class IndexService {

    private IndexController indexController;

    public IndexService(IndexController indexController) {
        this.indexController = indexController;
    }

    public void setLanguageAction(String languageType) throws Exception {
        if ("简体中文".equals(languageType)) {
            Config.set(Config.Keys.Locale, Locale.SIMPLIFIED_CHINESE);
        } else if ("English".equals(languageType)) {
            Config.set(Config.Keys.Locale, Locale.US);
        }

        FxAlerts.info("", indexController.getBundle().getString("SetLanguageText"));
    }

    public void addNodepadAction(ActionEvent event) {
        Parent notepad = FxmlUtils.load("/site/ryanc/ofc/tool/fxmlView/notepad/notepad.fxml");
        if (indexController.getSingleWindowBootCheckBox().isSelected()) {
            JavaFxViewUtil.getNewStage(indexController.getBundle().getString("addNodepad"), null, notepad);
        } else {
            Tab tab = new Tab(indexController.getBundle().getString("addNodepad"));
            tab.setContent(notepad);
            indexController.getTabPaneMain().getTabs().add(tab);
            if (event != null) {
                indexController.getTabPaneMain().getSelectionModel().select(tab);
            }
        }
    }

    public void addCRCBAppAction(ActionEvent event) {
        String title = indexController.getBundle().getString("addCRCBApp");
        String newPage = "/site/ryanc/ofc/tool/fxmlView/ofct/crcb_app.html";
        Boolean isNewStage = indexController.getSingleWindowBootCheckBox().isSelected();

        WebViewUtils.getNewWebPage(title, null, newPage, CRCBWebView.class.getName(), CRCB_App.class, isNewStage,
            indexController);
    }

    /**
     * @Title: addWebView
     * @Description: 添加WebView视图
     */
    public void addWebView(String title, String url, String iconPath) {
        WebView browser = new WebView();
        WebEngine webEngine = browser.getEngine();
        if (url.startsWith("http")) {
            webEngine.load(url);
        } else {
            webEngine.load(IndexController.class.getResource(url).toExternalForm());
        }
        if (indexController.getSingleWindowBootCheckBox().isSelected()) {
            JavaFxViewUtil.getNewStage(title, iconPath, new BorderPane(browser));
            return;
        }
        Tab tab = new Tab(title);
        if (StringUtils.isNotEmpty(iconPath)) {
            ImageView imageView = new ImageView(new Image(iconPath));
            imageView.setFitHeight(18);
            imageView.setFitWidth(18);
            tab.setGraphic(imageView);
        }
        tab.setContent(browser);
        indexController.getTabPaneMain().getTabs().add(tab);
        indexController.getTabPaneMain().getSelectionModel().select(tab);
    }
}