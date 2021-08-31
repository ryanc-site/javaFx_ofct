package site.ryanc.ofc.tool.controller.index;

import site.ryanc.ofc.tool.common.utils.Config;
import site.ryanc.ofc.tool.common.utils.Config.Keys;
import site.ryanc.ofc.tool.view.index.SystemSettingView;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.stage.Stage;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: SystemSettingController
 * @Description: 设置页面
 * @author: xufeng
 * @date: 2020/2/25 0025 16:44
 */

@Getter
@Setter
@Slf4j
public class SystemSettingController extends SystemSettingView {

    private Stage newStage = null;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        initView();
    }

    private void initView() {
        try {
            exitShowAlertCheckBox.setSelected(Config.getBoolean(Keys.ConfirmExit, true));
            saveStageBoundCheckBox.setSelected(Config.getBoolean(Keys.RememberWindowLocation, true));
        } catch (Exception e) {
            log.error("加载配置失败：", e);
        }
    }

    public void applySettings() {
        try {
            Config.set(Keys.ConfirmExit, exitShowAlertCheckBox.isSelected());
            Config.set(Keys.RememberWindowLocation, saveStageBoundCheckBox.isSelected());

            if (newStage != null) {
                newStage.close();
            }
        } catch (Exception e) {
            log.error("保存配置失败：", e);
        }
    }
}
