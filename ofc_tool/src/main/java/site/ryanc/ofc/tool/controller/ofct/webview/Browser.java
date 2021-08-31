package site.ryanc.ofc.tool.controller.ofct.webview;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.Worker.State;
import javafx.geometry.HPos;
import javafx.geometry.VPos;
import javafx.scene.layout.Region;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import netscape.javascript.JSObject;

public class Browser extends Region {
    protected WebView webView = new WebView();
    protected WebEngine webEnging = webView.getEngine();



    @Override
    protected double computePrefWidth(double width) {
        return 800;
    }

    @Override
    protected double computePrefHeight(double height) {
        return 600;
    }
}