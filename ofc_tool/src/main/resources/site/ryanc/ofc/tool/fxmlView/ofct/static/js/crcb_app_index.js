// 设置时间bar
const day2 = new Date();
day2.setTime(day2.getTime());
const s2 = day2.getFullYear() + "年" + (day2.getMonth() + 1) + "月" + day2.getDate() + "日";
document.getElementById("div_date_text").innerHTML=s2;

// 左侧菜单点击事件
function left_menu_click(bussinessType,ele){
    if (bussinessType === 'customer'){
        var sub_display = ele.sub_display;
        var inHtml = ele.innerHTML;
        if(sub_display === 'on'){
            ele.sub_display = 'off';
            ele.innerHTML=inHtml.replace("∨","<")
            $('#'+bussinessType+'_sub').hide();
        }else{
            ele.sub_display = 'on'
            ele.innerHTML=inHtml.replace("&lt;","∨")
            $('#'+bussinessType+'_sub').show();
        }
    }else{
        switch(bussinessType) {
            case 'loanmgr':
                document.getElementById("to_be_dev").style.display = "none";
                document.getElementById("loan_mgr_div").style.display = "block";
                document.getElementById("customer_mgr_div_ent").style.display = "none";
                document.getElementById("customer_mgr_div_person").style.display = "none";
                var loanStr = app.queryLoanInfos();
                // var loanStr = "[{\"ctime\":1630157214003,\"id\":\"17b8cf11133\",\"loan_amount_lowcase\":13000,\"loan_amount_upcase\":\"壹万叁仟元\",\"loan_apply_time\":\"2021-9-28\",\"loan_approve_time\":\"2021-10-10\",\"loan_assure_person\":\"比伯\",\"loan_assure_person_gender\":\"1\",\"loan_assure_type\":2,\"loan_contract_date\":\"2021-9-30\",\"loan_customer_type\":1,\"loan_end_date\":\"2022年4月28日\",\"loan_for_use\":\"买iphone13\",\"loan_m_rate\":\"6.5%\",\"loan_main_contractno\":\"ht-202108281\",\"loan_mode\":1,\"loan_pay_mode\":1,\"loan_person_address\":\"北京簋街\",\"loan_person_carno\":\"6228888888888888888\",\"loan_rate_plus_point\":\"1.0%\",\"loan_repay_mode\":1,\"loan_repay_person\":\"贾斯汀\",\"loan_repay_src\":\"拾荒\",\"loan_review_person_num\":5,\"loan_start_date\":\"2021年10月28日\",\"loan_sub_contractno\":\"20210828202031\",\"loan_term\":6,\"loan_total_credit_amount\":13000}]"
                displayLoanInfos(loanStr);
                break;
            case 'report':
                document.getElementById("to_be_dev").style.display = "block";
                document.getElementById("loan_mgr_div").style.display = "none";
                document.getElementById("customer_mgr_div_ent").style.display = "none";
                document.getElementById("customer_mgr_div_person").style.display = "none";
                break;
            case 'loanprocess':
                document.getElementById("to_be_dev").style.display = "block";
                document.getElementById("loan_mgr_div").style.display = "none";
                document.getElementById("customer_mgr_div_ent").style.display = "none";
                document.getElementById("customer_mgr_div_person").style.display = "none";
                break;
        }
    }
}

// call 打开遮罩弹窗
function show_mask_layer(businessType,subType){
    if(businessType === 'customer_mgr'){
        if(subType === 'ent'){
            document.getElementById('customer_mgr_Form_person').style.display = "none";
            document.getElementById('customer_mgr_Form_ent').style.display = "block";
            document.getElementById('loan_mgr_Form').style.display = "none";
        }else {
            document.getElementById('customer_mgr_Form_ent').style.display = "none";
            document.getElementById('loan_mgr_Form').style.display = "none";
            document.getElementById('customer_mgr_Form_person').style.display = "block";
        }
    }else if(businessType === 'loan_mgr'){
        document.getElementById('customer_mgr_Form_person').style.display = "none";
        document.getElementById('customer_mgr_Form_ent').style.display = "none";
        document.getElementById('loan_mgr_Form').style.display = "block";
    }
}

// call 关闭遮罩弹窗
function hide_mask_layer(businessType){
    document.getElementById('customer_mgr_Form_ent').style.display = "none";
    document.getElementById('customer_mgr_Form_person').style.display = "none";
    document.getElementById('loan_mgr_Form').style.display = "none";
}

// 转义 - 性别
function displayGender(gender){
    var genderDisplay = "";
    switch(gender){
        case '1':
            genderDisplay = "男";
            break;
        case '0':
            genderDisplay = "女";
            break;
        default:
            genderDisplay = "其他";
    }
    return genderDisplay;
}

// 转义 - 婚姻情况
function displayMarital(marital){
    var maritalDisplay = "";
    switch(marital){
        case '1':
            maritalDisplay = "已婚";
            break;
        case '0':
            maritalDisplay = "未婚";
            break;
        case '2':
            maritalDisplay = "离异";
            break;
        case '3':
            maritalDisplay = "丧偶";
            break;
    }
    return maritalDisplay;
}