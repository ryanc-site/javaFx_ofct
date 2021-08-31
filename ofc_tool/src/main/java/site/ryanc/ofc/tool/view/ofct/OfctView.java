package site.ryanc.ofc.tool.view.ofct;

import java.util.ResourceBundle;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class OfctView  implements Initializable {

    protected ResourceBundle bundle;

    @FXML
    protected Button myButton;

    @FXML
    protected TextField myTextField;

    @FXML
    protected Button myButton1;

    @FXML
    protected TextField myTextField1;
}