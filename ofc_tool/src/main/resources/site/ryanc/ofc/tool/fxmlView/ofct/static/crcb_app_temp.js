// 全局creditapp 数组
var creditapps = new Array();

// 空的creditapp
let empty_credit_html = "<tr>\n" +
    "          <td colspan=\"8\" align=\"center\">暂无数据</td>\n" +
    "        </tr>";

let table_title = '<tr>\n' +
    '          <th>序号</th>\n' +
    '          <th>姓名</th>\n' +
    '          <th>性别</th>\n' +
    '          <th>年龄</th>\n' +
    '          <th>身份证</th>\n' +
    '          <th>地址</th>\n' +
    '          <th>婚姻情况</th>\n' +
    '          <th>操作</th>\n' +
    '        </tr>'
// 获取弹窗
var modalForm = document.getElementById('myModalForm');
var myModalExport = document.getElementById('myModalExport');
var export_res = document.getElementById('export_res');

// 打开弹窗的按钮对象
var exprot_btn = document.getElementById("export_data");
var create_app_btn = document.getElementById("create_app");

// 获取 <span> 元素，用于关闭弹窗
var creditapp_close = document.getElementById("form_close");
var export_close = document.getElementById("export_close");
var export_res_close = document.getElementById("export_res_close");

// 点击按钮打开弹窗
create_app_btn.onclick = function () {
    modalForm.style.display = "block";
}
exprot_btn.onclick = function () {
    myModalExport.style.display = "block";
}

// 点击 <span> (x), 关闭弹窗
creditapp_close.onclick = function () {
    modalForm.style.display = "none";
}
export_close.onclick = function () {
    myModalExport.style.display = "none";
}
export_res_close.onclick = function () {
    export_res.style.display = "none";
}

// 新增授信信息
function dosubmit(){
    let name = document.getElementById("name");
    let name_err = document.getElementById("name_err");

    let gender = document.getElementById("gender");
    let gender_err = document.getElementById("gender_err");

    let age = document.getElementById("age");
    let age_err = document.getElementById("age_err");

    let identity = document.getElementById("identity");
    let identity_err = document.getElementById("identity_err");

    let address = document.getElementById("address");
    let address_err = document.getElementById("address_err");

    let marital = document.getElementById("marital");
    let marital_err = document.getElementById("marital_err");

    if(name.value === ''){
        name_err.innerHTML  = '姓名不合法！';
        return false;
    }else{
        name_err.innerHTML  = '';
    }
    if(gender.value === '' || gender.value === '-1'){
        gender_err.innerHTML  = '性别不合法！';
        return false;
    }else{
        gender_err.innerHTML  = '';
    }
    if(age.value === ''){
        age_err.innerHTML  = '年龄不合法！';
        return false;
    }else{
        age_err.innerHTML  = '';
    }
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if(identity.value === '' || reg.test(identity.value) === false){
        identity_err.innerHTML  = '身份证不合法！';
        return false;
    }else{
        identity_err.innerHTML  = '';
    }
    if(address.value === ''){
        address_err.innerHTML  = '地址不合法！';
        return false;
    }else{
        address_err.innerHTML  = '';
    }
    if(marital.value === '' || marital.value === '-1'){
        marital_err.innerHTML  = '婚姻信息不合法！';
        return false;
    }else{
        marital_err.innerHTML  = '';
    }
    let id = creditapps.length;
    let creditapp = {
        "id": id,
        "name": name.value,
        "gender": gender.value,
        "age": age.value,
        "identity": identity.value,
        "address": address.value,
        "marital": marital.value,
    };
    creditapps[id] = creditapp;
    dispalyTableData();
    modalForm.style.display = "none";

}

function dispalyTableData(){
    let table_data = document.getElementById("table_data");
    let table_data_html = "";
    if(creditapps.length === 0){
        table_data_html = table_title + empty_credit_html;
    }else{
        table_data_html += table_title;
        creditapps.forEach(function (app,index){
            table_data_html += "<tr>\n" +
                "          <td>"+app.id+"</td>\n" +
                "          <td>"+app.name+"</td>\n" +
                "          <td>"+app.gender+"</td>\n" +
                "          <td>"+app.age+"</td>\n" +
                "          <td>"+app.identity+"</td>\n" +
                "          <td>"+app.address+"</td>\n" +
                "          <td>"+app.marital+"</td>\n" +
                "          <td><a href='javascript:none;' onclick='javascript:delcreditapp("+app.id+")' >删除</a></td>\n" +
                "        </tr>"
        });
    }
    table_data.innerHTML = table_data_html;
}

function delcreditapp(id){
    let del_index = -1;
    creditapps.forEach(function (app,index){
        if(del_index !== -1 && app.id > del_index){
            creditapps[id].id = app.id;
        }
        if(app.id === id){
            del_index = id;
            creditapps.splice(index,1);
        }
    })

    creditapps.forEach(function (app,index){
        if(del_index !== -1 && app.id > del_index){
            creditapps[id].id = app.id - 1;
        }
    })
    dispalyTableData();
}

function do_exprot(){
    let file_path = document.getElementById("file_path");
    let file_path_err = document.getElementById("file_path_err");

    if(file_path.value === ''){
        file_path_err.innerHTML = '文件目录不合法！例：D:\\local_conf_lib'
        return false;
    }else{
        file_path_err.innerHTML = '';
    }
    myModalExport.style.display = "none";
    let cover = document.getElementById("cover");
    let covershow = document.getElementById("coverShow");
    cover.style.display = 'block';
    covershow.style.display = 'block';

    let export_result = "文件导出结果：";

    let ret = app.doExprot(file_path.value,JSON.stringify(creditapps))
    export_result += ret;

    let export_result_ele = document.getElementById("export_result");
    cover.style.display = 'none';
    covershow.style.display = 'none';
    export_result_ele.innerHTML = export_result;
    export_res.style.display = "block";

}

