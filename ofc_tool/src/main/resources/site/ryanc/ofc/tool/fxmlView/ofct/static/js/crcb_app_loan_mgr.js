// --- 贷款管理 声明 --------------------------------------------------------------------
let export_loan_id = "";

let empty_loan_customer_html = "<tr>\n" +
    "          <td colspan=\"6\" align=\"center\">暂无数据</td>\n" +
    "        </tr>";

let loan_title_html = "<thead>\n" +
    "              <tr>\n" +
   /* "                <th></th>\n" +*/
    "                <th>序号</th>\n" +
    "                <th>姓名</th>\n" +
    "                <th>金额</th>\n" +
    "                <th>利率</th>\n" +
    "                <th>期限（月）</th>\n" +
    "                <th>操作</th>\n" +
    "              </tr>\n" +
    "              </thead>";

/* call 类型筛选确认 */
function loan_type_sure(){
    var loan_to_be_dev_ele = document.getElementById("loan_to_be_dev");

    var loan_customer_type_ele = document.getElementById("loan_customer_type");
    var loan_assure_type_ele = document.getElementById("loan_assure_type");
    var loan_mode_ele = document.getElementById("loan_mode");
    var loan_pay_mode_ele = document.getElementById("loan_pay_mode");

    var loan_form_info_ele = document.getElementById("loan_person_assure_one-time_self-payment");

    if(loan_customer_type_ele.value === '-1'
        || loan_assure_type_ele.value === '-1'
        || loan_mode_ele.value === '-1'
        || loan_pay_mode_ele.value === '-1'){
        $('.tips').html('请选择类型！').addClass('tips-warn').fadeIn().delay(1500).fadeOut();
    }else if(loan_customer_type_ele.value === '1'
        && loan_assure_type_ele.value === '2'
        && loan_mode_ele.value === '1'
        && loan_pay_mode_ele.value === '1'){
        loan_form_info_ele.style.display = 'block';
        loan_to_be_dev_ele.style.display = 'none';
    }else{
        loan_form_info_ele.style.display = 'none';
        loan_to_be_dev_ele.style.display = 'block';
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
    var loan_customer_type  = document.getElementById("loan_customer_type").value;
    var loan_assure_type  = document.getElementById("loan_assure_type").value;
    var loan_mode  = document.getElementById("loan_mode").value;
    var loan_pay_mode  = document.getElementById("loan_pay_mode").value;

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

    var loan_assure_person  = document.getElementById("loan_assure_person").value;
    var loan_assure_person_gender  = document.getElementById("loan_assure_person_gender").value;
    var loan_person_address  = document.getElementById("loan_person_address").value;

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

        "loan_apply_time":loan_apply_time,
        "loan_review_person_num":loan_review_person_num,
        "loan_approve_time":loan_approve_time,
        "loan_contract_date":loan_contract_date
    }
    return loan_json;
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
                "          <td>"+loan.loan_amount_upcase+"</td>\n" +
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
