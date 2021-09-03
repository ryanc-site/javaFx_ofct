// --- 贷款管理 声明 --------------------------------------------------------------------
let export_loan_id = "";

let empty_loan_customer_html = "<tr>\n" +
    "          <td colspan=\"10\" align=\"center\">暂无数据</td>\n" +
    "        </tr>";

let loan_title_html = "<thead>\n" +
    "              <tr>\n" +
   /* "                <th></th>\n" +*/
    "                <th>序号</th>\n" +
    "                <th>姓名</th>\n" +
    "                <th>客户类型</th>\n" +
    "                <th>保证方式</th>\n" +
    "                <th>贷款方式</th>\n" +
    "                <th>支付方式</th>\n" +
    "                <th>金额</th>\n" +
    "                <th>利率</th>\n" +
    "                <th>期限（月）</th>\n" +
    "                <th>操作</th>\n" +
    "              </tr>\n" +
    "              </thead>";

/* call 类型筛选确认 */
function loan_type_sure(){
    var loan_customer_type_ele = document.getElementById("loan_customer_type");
    var loan_assure_type_ele = document.getElementById("loan_assure_type");
    var loan_mode_ele = document.getElementById("loan_mode");
    var loan_pay_mode_ele = document.getElementById("loan_pay_mode");

    if(loan_customer_type_ele.value === '-1'
        || loan_assure_type_ele.value === '-1'
        || loan_mode_ele.value === '-1'
        || loan_pay_mode_ele.value === '-1'){
        $('.tips').html('请选择类型！').addClass('tips-warn').fadeIn().delay(1500).fadeOut();
    }else if(loan_customer_type_ele.value === '1'
        && loan_assure_type_ele.value === '2'
        && loan_mode_ele.value === '1'
        && loan_pay_mode_ele.value === '1'){
        $('#loan_form_info').show();
        $('#loan_to_be_dev').hide();

        $('#loan_other_info').hide();
        $('#other_loan_mode_2').hide();
        $('#other_loan_mode_3').hide();
        $('#other_loan_pay_mode_2').hide();
    }else if(loan_customer_type_ele.value === '1'
             && loan_assure_type_ele.value === '2'){
        display_other_loan_mode(loan_mode_ele.value)
        display_other_loan_pay_mode(loan_pay_mode_ele.value)
        $('#loan_other_info').show();
        $('#loan_form_info').show();
    }else{
        $('#loan_other_info').hide();
        $('#loan_form_info').hide();
        $('#loan_to_be_dev').show();
    }
}

/* call 保存贷款信息 */
function save_loan_info(){
    // 贷款信息
    var loanJson = buildLoanInfoParamJson();

    // 调用后台 保存数据
    var do_result_html = app.addLoanInfo(JSON.stringify(loanJson));
    // var do_result_html = "贷款添加成功";

    $("#loan_mgr_Form").hide();
    $('.tips').html(do_result_html).addClass('tips-success').fadeIn().delay(1500).fadeOut();

    var loanStr = app.queryLoanInfos();
    // var loanStr = "[{\"ctime\":1630157214003,\"id\":\"17b8cf11133\",\"loan_amount_lowcase\":13000,\"loan_amount_upcase\":\"壹万叁仟元\",\"loan_apply_time\":\"2021-9-28\",\"loan_approve_time\":\"2021-10-10\",\"loan_assure_person\":\"比伯\",\"loan_assure_person_gender\":\"1\",\"loan_assure_type\":2,\"loan_contract_date\":\"2021-9-30\",\"loan_customer_type\":1,\"loan_end_date\":\"2022年4月28日\",\"loan_for_use\":\"买iphone13\",\"loan_m_rate\":\"6.5%\",\"loan_main_contractno\":\"ht-202108281\",\"loan_mode\":1,\"loan_pay_mode\":1,\"loan_person_address\":\"北京簋街\",\"loan_person_carno\":\"6228888888888888888\",\"loan_rate_plus_point\":\"1.0%\",\"loan_repay_mode\":1,\"loan_repay_person\":\"贾斯汀\",\"loan_repay_src\":\"拾荒\",\"loan_review_person_num\":5,\"loan_start_date\":\"2021年10月28日\",\"loan_sub_contractno\":\"20210828202031\",\"loan_term\":6,\"loan_total_credit_amount\":13000}]"
    displayLoanInfos(loanStr);


}

/* call 贷款文档预导出 */
function pre_export_loan(load_id){
    var loan_export_ele = document.getElementById('loan_export');
    loan_export_ele.style.display = 'block';
    export_loan_id = load_id
}

/* call 贷款文档导出 */
function do_export_loan(){
    var loan_export_ele = document.getElementById('loan_export');
    let file_path = document.getElementById("file_path");

    if(file_path.value === ''){
        $('.tips').html('文件目录不合法！例：D:\\ofc_tool').addClass('tips-success').fadeIn().delay(1500).fadeOut();
        return false;
    }
    loan_export_ele.style.display = "none";
    let cover = document.getElementById("cover");
    let covershow = document.getElementById("coverShow");
    cover.style.display = 'block';
    covershow.style.display = 'block';

    let export_result = "文件导出结果：";

    let ret = app.doExprotLoan(file_path.value,export_loan_id)
    export_result += ret;
    $('.tips').html(export_result).addClass('tips-success').fadeIn().delay(1500).fadeOut();

    cover.style.display = 'none';
    covershow.style.display = 'none';



}

/* call 删除贷款信息 */
function del_loan(loan_id){
    var loanDelParam = {
        "loan_id":loan_id
    }
    var do_result_html = app.delLoan(JSON.stringify(loanDelParam));
    $('.tips').html(do_result_html).addClass('tips-success').fadeIn().delay(1500).fadeOut();

    var loanStr = app.queryLoanInfos();
    // var loanStr = "[{\"ctime\":1630157214003,\"id\":\"17b8cf11133\",\"loan_amount_lowcase\":13000,\"loan_amount_upcase\":\"壹万叁仟元\",\"loan_apply_time\":\"2021-9-28\",\"loan_approve_time\":\"2021-10-10\",\"loan_assure_person\":\"比伯\",\"loan_assure_person_gender\":\"1\",\"loan_assure_type\":2,\"loan_contract_date\":\"2021-9-30\",\"loan_customer_type\":1,\"loan_end_date\":\"2022年4月28日\",\"loan_for_use\":\"买iphone13\",\"loan_m_rate\":\"6.5%\",\"loan_main_contractno\":\"ht-202108281\",\"loan_mode\":1,\"loan_pay_mode\":1,\"loan_person_address\":\"北京簋街\",\"loan_person_carno\":\"6228888888888888888\",\"loan_rate_plus_point\":\"1.0%\",\"loan_repay_mode\":1,\"loan_repay_person\":\"贾斯汀\",\"loan_repay_src\":\"拾荒\",\"loan_review_person_num\":5,\"loan_start_date\":\"2021年10月28日\",\"loan_sub_contractno\":\"20210828202031\",\"loan_term\":6,\"loan_total_credit_amount\":13000}]"
    displayLoanInfos(loanStr);

}

// --- 内部方法 ----------------------------------------------------------------------
function buildLoanInfoParamJson(){
    // 类别删选
    var loan_customer_type  = document.getElementById("loan_customer_type").value;
    var loan_assure_type  = document.getElementById("loan_assure_type").value;
    var loan_mode  = document.getElementById("loan_mode").value;
    var loan_pay_mode  = document.getElementById("loan_pay_mode").value;

    // 贷款信息
    var loan_repay_mode  = document.getElementById("loan_repay_mode").value;
    var loan_repay_person  = document.getElementById("loan_repay_person").value;
    var loan_person_carno  = document.getElementById("loan_person_carno").value;
    var loan_for_use  = document.getElementById("loan_for_use").value;
    var loan_repay_src  = document.getElementById("loan_repay_src").value;
    var loan_amount_upcase  = document.getElementById("loan_amount_upcase").value;
    var loan_amount_lowcase  = document.getElementById("loan_amount_lowcase").value;
    var loan_total_credit_amount  = document.getElementById("loan_total_credit_amount").value;
    var loan_rate_plus_point  = document.getElementById("loan_rate_plus_point").value;
    var loan_term  = document.getElementById("loan_term").value;
    var loan_start_date  = document.getElementById("loan_start_date").value;
    var loan_end_date  = document.getElementById("loan_end_date").value;
    var loan_m_rate  = document.getElementById("loan_m_rate").value;
    var loan_main_contractno  = document.getElementById("loan_main_contractno").value;
    var loan_sub_contractno  = document.getElementById("loan_sub_contractno").value;

    // 保证信息
    var loan_assure_person  = document.getElementById("loan_assure_person").value;
    var loan_assure_person_gender  = document.getElementById("loan_assure_person_gender").value;
    var loan_person_address  = document.getElementById("loan_person_address").value;
    var loan_person_id  = document.getElementById("loan_person_id").value;

    // 其他信息
    // 贷款方式：循环方式 ==> 附加项
    var loan_this_start_date  = document.getElementById("loan_this_start_date").value;
    var loan_this_end_date  = document.getElementById("loan_this_end_date").value;
    var loan_this_months  = document.getElementById("loan_this_months").value;
    // 贷款方式：特色产品 ==> 附加项
    var loan_special_prod_type  = document.getElementById("loan_special_prod_type").value;
    var  loan_borrower_type = document.getElementById("loan_borrower_type").value;

    // 支付方式：委托 ==> 附加项
    var loan_entrust_pay_date  = document.getElementById("loan_entrust_pay_date").value;
    var loan_entrust_pay_amount  = document.getElementById("loan_entrust_pay_amount").value;
    var loan_entrust_pay_payee  = document.getElementById("loan_entrust_pay_payee").value;
    var loan_entrust_pay_receipt_account  = document.getElementById("loan_entrust_pay_receipt_account").value;
    var loan_entrust_pay_receipt_deposit  = document.getElementById("loan_entrust_pay_receipt_deposit").value;


    // 审批信息
    var loan_apply_time  = document.getElementById("loan_apply_time").value;
    var loan_review_person_num  = document.getElementById("loan_review_person_num").value;
    var loan_approve_time  = document.getElementById("loan_approve_time").value;
    var loan_contract_date  = document.getElementById("loan_contract_date").value;
    // 构建 - json数据
    var loan_json = {
        "loan_customer_type":loan_customer_type,
        "loan_assure_type":loan_assure_type,
        "loan_mode":loan_mode,
        "loan_pay_mode":loan_pay_mode,

        "loan_repay_mode":loan_repay_mode,
        "loan_repay_person":loan_repay_person,
        "loan_person_carno":loan_person_carno,
        "loan_for_use":loan_for_use,
        "loan_repay_src":loan_repay_src,
        "loan_amount_upcase":loan_amount_upcase,
        "loan_amount_lowcase":loan_amount_lowcase,
        "loan_total_credit_amount":loan_total_credit_amount,
        "loan_rate_plus_point":loan_rate_plus_point,
        "loan_term":loan_term,
        "loan_start_date":loan_start_date,
        "loan_end_date":loan_end_date,
        "loan_m_rate":loan_m_rate,
        "loan_main_contractno":loan_main_contractno,
        "loan_sub_contractno":loan_sub_contractno,

        "loan_assure_person":loan_assure_person,
        "loan_assure_person_gender":loan_assure_person_gender,
        "loan_person_address":loan_person_address,

        "loan_this_start_date":loan_this_start_date,
        "loan_this_end_date":loan_this_end_date,
        "loan_this_months":loan_this_months,

        "loan_special_prod_type":loan_special_prod_type,
        "loan_borrower_type":loan_borrower_type,

        "loan_entrust_pay_date":loan_entrust_pay_date,
        "loan_entrust_pay_amount":loan_entrust_pay_amount,
        "loan_entrust_pay_payee":loan_entrust_pay_payee,
        "loan_entrust_pay_receipt_account":loan_entrust_pay_receipt_account,
        "loan_entrust_pay_receipt_deposit":loan_entrust_pay_receipt_deposit,

        "loan_apply_time":loan_apply_time,
        "loan_review_person_num":loan_review_person_num,
        "loan_approve_time":loan_approve_time,
        "loan_contract_date":loan_contract_date
    }
    return loan_json;
}

// 显示 - 其他信息 - 贷款方式
function display_other_loan_mode(type){
    var isOk = false;
    switch (type) {
        case '1': {
            $('#other_loan_mode_2').hide()
            $('#other_loan_mode_3').hide()
            clean_other_loan_mode_value("2");
            clean_other_loan_mode_value("3");
            isOk = true;
            break;
        }
        case '2': {
            $('#other_loan_mode_2').show()
            $('#other_loan_mode_3').hide()
            clean_other_loan_mode_value("3");
            isOk = true;
            break;
        }
        case '3': {
            $('#other_loan_mode_2').hide()
            $('#other_loan_mode_3').show()
            clean_other_loan_mode_value("2");
            isOk = true;
            break;
        }
    }
    return isOk;
}

// 显示 - 其他信息 - 支付方式
function display_other_loan_pay_mode(type){
    var isOk = false;
    switch (type) {
        case '1': {
            $('#other_loan_pay_mode_2').hide();
            clean_other_loan_pay_mode_value("2");
            isOk = true;
            break;
        }
        case '2': {
            $('#other_loan_pay_mode_2').show();
            isOk = true;
            break;
        }
    }
    return isOk;
}

// 清除 — 贷款方式对应的值
function clean_other_loan_mode_value(type){
    switch (type) {
        case '2': {
            $('#loan_this_start_date').val("")
            $('#loan_this_end_date').val("")
            $('#loan_this_months').val("")
            break;
        }
        case '3': {
            $('#loan_special_prod_type').val("-1")
            $('#loan_borrower_type').val("-1")
            break;
        }
    }
}

// 清除 — 支付方式对应的值
function clean_other_loan_pay_mode_value(type){
    switch (type) {
        case '2': {
            $('#loan_entrust_pay_date').val("")
            $('#loan_entrust_pay_amount').val("")
            $('#loan_entrust_pay_payee').val("")
            $('#loan_entrust_pay_receipt_account').val("")
            $('#loan_entrust_pay_receipt_deposit').val("")
            break;
        }
    }
}

// 回显 - 个人客户数据
function displayLoanInfos(loanJson){
    var loan_table_data_ele = document.getElementById('loan_mgr_table_data');
    var loan_data_html = "";
    var loans = eval(loanJson);
    loan_data_html += loan_title_html;
    if(loans.length === 0){
        loan_data_html += empty_loan_customer_html ;
    }else{
        loans.forEach(function (loan,index){
            loan_data_html +=  "<tr>\n" +
                /*"          <td><input type='checkbox'/></td>\n" +*/
                "          <td>"+loan.id+"</td>\n" +
                "          <td>"+loan.loan_repay_person+"</td>\n" +

                "          <td>"+display_customer(loan.loan_customer_type)+"</td>\n" +
                "          <td>"+display_Loan_assure_type(loan.loan_assure_type)+"</td>\n" +
                "          <td>"+display_loan_mode(loan.loan_mode)+"</td>\n" +
                "          <td>"+display_Loan_pay_mode(loan.loan_pay_mode)+"</td>\n" +

                "          <td>"+loan.loan_amount_lowcase+"</td>\n" +
                "          <td>"+loan.loan_m_rate+"</td>\n" +
                "          <td>"+loan.loan_term+"</td>\n" +
                "          <td>" +
                "<label class='del_txt' onclick='javascript:pre_export_loan(\""+loan.id+"\")' >导出</label>" +
                "&nbsp;&nbsp;" +
                "<label class='del_txt' onclick='javascript:del_loan(\""+loan.id+"\")' >删除</label>" +
                "</td>\n" +
                "        </tr>";
        });
    }
    loan_table_data_ele.innerHTML = loan_data_html;
}

// 转义 - 客户方式
function display_customer(type) {
        var result = "";
        switch (type) {
            case 1: {
                result = "个人";
                break;
            }
            case 0: {
                result = "公司";
                break;
            }
        }
        return result;
    }

// 转义 - 贷款方式
function display_loan_mode(type) {
        var result = "";
        switch (type) {
            case 1: {
                result = "一次性";
                break;
            }
            case 2: {
                result = "循环";
                break;
            }
            case 3: {
                result = "特色产品";
                break;
            }
        }
        return result;
    }

// 转义 - 保证方式
function display_Loan_assure_type(type) {
        var result = "";
        switch (type) {
            case 1: {
                result = "抵押";
                break;
            }
            case 2: {
                result = "保证";
                break;
            }
            case 3: {
                result = "信用";
                break;
            }
            case 4: {
                result = "质押";
                break;
            }
        }
        return result;
    }

// 转义 - 支付方式
function display_Loan_pay_mode(type) {
    var result = "";
    switch (type) {
        case 1: {
            result = "自主支付";
            break;
        }
        case 2: {
            result = "委托支付";
            break;
        }
    }
    return result;
}
