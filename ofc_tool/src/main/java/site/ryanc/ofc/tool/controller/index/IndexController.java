package site.ryanc.ofc.tool.controller.index;

import static site.ryanc.ofc.tool.Main.RESOURCE_BUNDLE;
import static site.ryanc.ofc.tool.common.utils.Config.Keys.NotepadEnabled;

import site.ryanc.ofc.tool.controller.ofct.CRCB_App;
import site.ryanc.ofc.tool.services.IndexService;
import site.ryanc.ofc.tool.services.index.SystemSettingService;
import site.ryanc.ofc.tool.common.utils.Config;
import site.ryanc.ofc.tool.view.index.IndexView;
import com.xwintop.xcore.util.ConfigureUtil;
import com.xwintop.xcore.util.HttpClientUtil;
import com.xwintop.xcore.util.javafx.AlertUtil;
import com.xwintop.xcore.util.javafx.JavaFxSystemUtil;

import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.ContextMenu;
import javafx.scene.control.Menu;
import javafx.scene.control.MenuItem;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.time.DateFormatUtils;

/**
 * @ClassName: IndexController
 * @Description: 主页
 * @author: xufeng
 * @date: 2017年7月20日 下午1:50:00
 */
@Slf4j
@Getter
@Setter
public class IndexController extends IndexView {

    public static final String welcome_page = "http://www.czrxcb.com";

    private Map<String, Menu> menuMap = new HashMap<>();

    private Map<String, MenuItem> menuItemMap = new HashMap<>();

    private IndexService indexService = new IndexService(this);

    private ContextMenu contextMenu = new ContextMenu();

    public static FXMLLoader getFXMLLoader() {
        URL url = Object.class.getResource("/site/ryanc/ofc/tool/fxmlView/index/Index.fxml");
        return new FXMLLoader(url, RESOURCE_BUNDLE);
    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        this.bundle = resources;
        initNotepad();
        CRCB_App.restoreData();
        this.indexService.addWebView(RESOURCE_BUNDLE.getString("welcome"), welcome_page, null);
    }

    private void initNotepad() {
        if (Config.getBoolean(NotepadEnabled, false)) {
            addNodepadAction(null);
        }
    }
    @FXML
    private void exitAction() {
        Platform.exit();
        System.exit(0);
    }



    @FXML
    private void addNodepadAction(ActionEvent event) {
        indexService.addNodepadAction(event);
    }

    @FXML
    public void CRCBAction(ActionEvent crcbEvent) {
        indexService.addCRCBAppAction(crcbEvent);
    }

    @FXML
    private void SettingAction() {
        SystemSettingService.openSystemSettings(bundle.getString("Setting"));
    }

    @FXML
    private void aboutAction() {
        AlertUtil.showInfoAlert(bundle.getString("aboutText") + Config.ofct_version);
    }

    @FXML
    private void setLanguageAction(ActionEvent event) throws Exception {
        MenuItem menuItem = (MenuItem) event.getSource();
        indexService.setLanguageAction(menuItem.getText());
    }

    @FXML
    private void openLogFileAction() {
        String filePath = "logs/logFile." + DateFormatUtils.format(new Date(), "yyyy-MM-dd") + ".log";
        JavaFxSystemUtil.openDirectory(filePath);
    }

    @FXML
    private void openLogFolderAction() {
        JavaFxSystemUtil.openDirectory("logs/");
    }

    @FXML
    private void openConfigFolderAction() {
        JavaFxSystemUtil.openDirectory(ConfigureUtil.getConfigurePath());
    }


}
