// --- 客户管理 声明 --------------------------------------------------------------------
let empty_person_customer_html = "<tr>\n" +
    "          <td colspan=\"6\" align=\"center\">暂无数据</td>\n" +
    "        </tr>";

let person_customer_title_html = '<thead>\n'+
    '        <tr>\n' +
    '          <th>ID</th>\n' +
    '          <th>姓名</th>\n' +
    '          <th>性别</th>\n' +
    '          <th>电话</th>\n' +
    '          <th>婚姻情况</th>\n' +
    '          <th>操作</th>\n' +
    '        </tr>'+
    '     </thead>';


// call 企业客户管理（ent）  &  个人客户管理（person） --> 页面切换
function customer_mgr(customerType){
    if(customerType === 'person'){
        document.getElementById("to_be_dev").style.display = "none";
        document.getElementById("customer_mgr_div_ent").style.display = "none";
        document.getElementById("loan_mgr_div").style.display = "none";
        document.getElementById("customer_mgr_div_person").style.display = "block";
        // 查询个人客户数据
        var customerQueryParam = {
            "customerType":"person"
        }
        var personsStr = app.queryPersonCustomer(JSON.stringify(customerQueryParam));
       // var personsStr = "[{'ctime':1630029624135,'id':'17b85563346','p_dwell_add':'广州','p_gender':'1','p_hukou_add':'上海','p_id':'52000199505205200','p_id_add':'北京','p_job':'新时代农名工','p_last_year_family_net_asset':'1','p_m_in':'100','p_marital':'0','p_name':'贾斯汀','p_net_asset':'-100000','p_tel':'13788888888','p_total_asset':'500','p_total_debt':'1000000','p_work_add':'深圳','p_y_in':'1000'},{'ctime':1630029629478,'id':'17b85564826','p_dwell_add':'广州','p_gender':'1','p_hukou_add':'上海','p_id':'52000199505205200','p_id_add':'北京','p_job':'新时代农名工','p_last_year_family_net_asset':'1','p_m_in':'100','p_marital':'0','p_name':'陈关照','p_net_asset':'-100000','p_tel':'13788888888','p_total_asset':'500','p_total_debt':'1000000','p_work_add':'深圳','p_y_in':'1000'}]";

        displayPersonCustomers(personsStr);
    }else if(customerType === 'ent'){
        // 时间原因 企业客户管理先不做
        document.getElementById("to_be_dev").style.display = "block";
        document.getElementById("customer_mgr_div_person").style.display = "none";
        document.getElementById("loan_mgr_div").style.display = "none";
        document.getElementById("customer_mgr_div_ent").style.display = "none";
    }
}

// call 客户信息提交（新增客户）
function add_customer(customerType){
    if(customerType === 'person'){
        // 个人客户信息
        var personJson = buildPersonParamJson();
        // 调用后台 保存数据
        var do_result_html = app.addPersonCustomer(JSON.stringify(personJson));
        // var do_result_html = "添加成功";

        $("#customer_mgr_Form_person").hide();
        $('.tips').html(do_result_html).addClass('tips-success').fadeIn().delay(1500).fadeOut();

        // 查询个人客户数据
        var customerQueryParam = {
            "customerType":"person"
        }
        var personsStr = app.queryPersonCustomer(JSON.stringify(customerQueryParam));
       // var personsStr = "[{'ctime':1630029624135,'id':'17b85563346','p_dwell_add':'广州','p_gender':'1','p_hukou_add':'上海','p_id':'52000199505205200','p_id_add':'北京','p_job':'新时代农名工','p_last_year_family_net_asset':'1','p_m_in':'100','p_marital':'0','p_name':'贾斯汀','p_net_asset':'-100000','p_tel':'13788888888','p_total_asset':'500','p_total_debt':'1000000','p_work_add':'深圳','p_y_in':'1000'},{'ctime':1630029629478,'id':'17b85564826','p_dwell_add':'广州','p_gender':'1','p_hukou_add':'上海','p_id':'52000199505205200','p_id_add':'北京','p_job':'新时代农名工','p_last_year_family_net_asset':'1','p_m_in':'100','p_marital':'0','p_name':'陈关照','p_net_asset':'-100000','p_tel':'13788888888','p_total_asset':'500','p_total_debt':'1000000','p_work_add':'深圳','p_y_in':'1000'}]";
        displayPersonCustomers(personsStr);
    }else{
        // 企业客户信息 todo 待开发
    }

}

// call 客户信息删除
function del_customer(customerType,customerId){
    var customerDelParam = {
        "customerType":customerType,
        "customerId":customerId
    }
    var do_result_html = app.delCustomer(JSON.stringify(customerDelParam));
    $('.tips').html(do_result_html).addClass('tips-success').fadeIn().delay(1500).fadeOut();

    // 查询个人客户数据
    var customerQueryParam = {
        "customerType":"person"
    }
    var personsStr = app.queryPersonCustomer(JSON.stringify(customerQueryParam));
    displayPersonCustomers(personsStr);
}

// --- 内部方法 ----------------------------------------------------------------------
// 构建 - 个人客户待保存数据
function buildPersonParamJson(){
    // 获取 - 个人客户表单数据
    var p_name = document.getElementById('p_name');
    var p_gender = document.getElementById('p_gender');
    var p_marital = document.getElementById('p_marital');
    var p_tel = document.getElementById('p_tel');
    var p_id = document.getElementById('p_id');
    var p_id_add = document.getElementById('p_id_add');
    var p_hukou_add = document.getElementById('p_hukou_add');
    var p_dwell_add = document.getElementById('p_dwell_add');
    var p_work_add = document.getElementById('p_work_add');
    var p_job = document.getElementById('p_job');
    var p_m_in = document.getElementById('p_m_in');
    var p_y_in = document.getElementById('p_y_in');
    var p_total_asset = document.getElementById('p_total_asset');
    var p_total_debt = document.getElementById('p_total_debt');
    var p_net_asset = document.getElementById('p_net_asset');
    var p_last_year_family_net_asset = document.getElementById('p_last_year_family_net_asset');

    // 构建 - json数据
    var p_json = {
        "p_name":p_name.value,
        "p_gender":p_gender.value,
        "p_marital":p_marital.value,
        "p_tel":p_tel.value,
        "p_id":p_id.value,
        "p_id_add":p_id_add.value,
        "p_hukou_add":p_hukou_add.value,
        "p_dwell_add":p_dwell_add.value,
        "p_work_add":p_work_add.value,
        "p_job":p_job.value,
        "p_m_in":p_m_in.value,
        "p_y_in":p_y_in.value,
        "p_total_asset":p_total_asset.value,
        "p_total_debt":p_total_debt.value,
        "p_net_asset":p_net_asset.value,
        "p_last_year_family_net_asset":p_last_year_family_net_asset.value
    }
    return p_json;
}

// 回显 - 个人客户数据
function displayPersonCustomers(personJson){
    var person_table_data_ele = document.getElementById('person_customer_table_data');
    var person_customer_data_html = "";
    var persons = eval(personJson);
    person_customer_data_html += person_customer_title_html;
    if(persons.length === 0){
        person_customer_data_html += empty_person_customer_html ;
    }else{
        persons.forEach(function (person,index){
            person_customer_data_html +=  "<tr>\n" +
                "          <td>"+person.id+"</td>\n" +
                "          <td>"+person.p_name+"</td>\n" +
                "          <td>"+displayGender(person.p_gender)+"</td>\n" +
                "          <td>"+person.p_tel+"</td>\n" +
                "          <td>"+displayMarital(person.p_marital)+"</td>\n" +
                "          <td><label class='del_txt' onclick='javascript:del_customer(\"person\",\""+person.id+"\")' >删除</label></td>\n" +
                "        </tr>";
        });
    }

    person_table_data_ele.innerHTML = person_customer_data_html;
}

