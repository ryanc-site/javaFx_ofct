package site.ryanc.ofc.tool.controller.ofct;

import cn.afterturn.easypoi.word.WordExportUtil;
import cn.hutool.core.io.FileUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import site.ryanc.ofc.tool.Main;
import site.ryanc.ofc.tool.common.utils.HtmlUtil;
import site.ryanc.ofc.tool.model.ofct.LoanInfo;
import site.ryanc.ofc.tool.model.ofct.PersonCustomer;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * 授信申请处理类
 *
 * @author cWX993443
 * @since 2021-07-25
 */
public class CRCB_App {

    private static final Logger log = LoggerFactory.getLogger(CRCB_App.class);

    private static String dataFilePath;

    static {
        dataFilePath = CRCB_App.class.getResource("/").getPath() + "db/p_customer.db";
    }

    private static Map<String, String> template_base_Map = new HashMap<String, String>() {{
        put("loan_a.docx", "1档案封面.docx");
        put("loan_b.docx", "2个人借款申请书.docx");
        put("loan_c.docx", "3夫妻双方同意借款意见书.docx");
        put("loan_d.docx", "4夫妻双方同意保证意见书.docx");
        put("loan_e.docx", "5河北沧州农商行运河支行信贷业务审批提案表.docx");
        put("loan_f.docx", "6信贷业务审议会议纪要.docx");
        put("loan_g.docx", "7贷款管理责任状.docx");
        put("loan_h.docx", "8首次检查报告单.docx");
    }};

    private static Map<String,String> template_zizhu_map = new HashMap<String,String>(){{
        put("self_pay_loan.docx", "自主支付监控联系单.docx");
    }};


    // 个人客户数据
    private static List<PersonCustomer> personCustomers = new ArrayList<>();

    // 企业客户数据
    private static List<PersonCustomer> entCustomers = new ArrayList<>();

    // 贷款信息数据
    private static List<LoanInfo> loanInfos = new ArrayList<>();

    /**
     * 添加个人客户
     *
     * @param personJson 客户信息json
     * @return 操作结果
     */
    public String addPersonCustomer(String personJson) {
        String ret = "";
        try {
            PersonCustomer personCustomer = JSON.parseObject(personJson, PersonCustomer.class);
            personCustomers.add(personCustomer);
            Collections.sort(personCustomers);
            ret = "客户添加成功！";
            log.info("新增 - 个人客户：成功 ==>ID：{}", personCustomer.getId());
        } catch (Exception e) {
            log.error("新增 - 个人客户：失败 ==>{}", e.getMessage(), e);
            ret = "客户添加失败";
        }
        return ret;
    }

    /**
     * 删除指定的客户数据
     *
     * @param customerDelParamStr 删除请求参数
     * @return 操作结果
     */
    public String delCustomer(String customerDelParamStr) {
        log.info("业务 - 客户删除 ==> param:{}", customerDelParamStr);

        String ret = "";
        try {
            Map<String, Object> customerDelMap = JSON.parseObject(customerDelParamStr, HashMap.class);
            String customerType = String.valueOf(customerDelMap.get("customerType"));
            String customerId = (String) customerDelMap.get("customerId");
            if ("person".equals(customerType)) {
                // 删除个人数据
                personCustomers.removeIf(p -> p.getId().equals(customerId));
                Collections.sort(personCustomers);
                ret = "客户删除成功!";
            } else if ("ent".equals(customerType)) {
                // 删除企业数据
                entCustomers.removeIf(p -> p.getId().equals(customerId));
                Collections.sort(entCustomers);
                ret = "客户删除成功!";
            }
        } catch (Exception e) {
            log.error("业务 - 数据删除：异常 => customerDelParamStr：【{}】| {}", customerDelParamStr, e);
            ret = "客户删除异常!";
        }
        return ret;
    }


    /**
     * 查询客户数据
     *
     * @param customerQueryParamStr 查询参数
     * @return 客户数据
     * todo 后续要做分页查询
     */
    public String queryPersonCustomer(String customerQueryParamStr) {
        log.info("业务 - 客户查询 ==> param:{}", customerQueryParamStr);
        String resultJson = null;
        try {
            Map<String, Object> customerQueryMap = JSON.parseObject(customerQueryParamStr, HashMap.class);
            String customerType = String.valueOf(customerQueryMap.get("customerType"));
            if ("person".equals(customerType)) {
                // 个人客户查询
                resultJson = JSON.toJSONString(personCustomers);
            } else if ("ent".equals(customerType)) {
                // 企业客户查询
                resultJson = JSON.toJSONString(entCustomers);
            }
        } catch (Exception e) {
            log.error("业务 - 客户查询：异常 => param：【{}】| {}", customerQueryParamStr, e);
        }

        return resultJson;
    }


    /**
     * 新增贷款信息
     *
     * @param loanJson 贷款信息Json
     * @return 操作结果
     */
    public String addLoanInfo(String loanJson) {
        String ret = null;
        try {
            LoanInfo loanInfo = JSON.parseObject(loanJson, LoanInfo.class);
            loanInfos.add(loanInfo);
            Collections.sort(loanInfos);
            ret = "贷款添加成功！";
            log.info("新增 - 贷款信息：成功 ==>ID：{}", loanInfo.getId());

        } catch (Exception e) {
            log.error("新增 - 贷款信息：失败 ==>{}", e.getMessage(), e);
            ret = "贷款添加失败";
        }
        return ret;
    }


    /**
     * 查询贷款信息 todo 目前因为只有 个人 -> 保证 -> 一次性 -> 自主支付 一种类型的组合，故全查
     *
     * @return 贷款信息json
     */
    public String queryLoanInfos() {
        String resultJson = null;
        try {
            resultJson = JSON.toJSONString(loanInfos);
        } catch (Exception e) {
            log.error("业务 - 客户查询：异常 =>  {}", e.getMessage(), e);
        }
        return resultJson;
    }


    /**
     * 贷款删除
     *
     * @param loanDelParamStr 删除参数
     * @return 操作结果
     */
    public String delLoan(String loanDelParamStr) {
        log.info("业务 - 贷款删除 ==> param:{}", loanDelParamStr);

        String ret = "";
        try {
            Map<String, Object> loanDelMap = JSON.parseObject(loanDelParamStr, HashMap.class);
            String loan_id = (String) loanDelMap.get("loan_id");
            // 删除贷款数据
            loanInfos.removeIf(p -> p.getId().equals(loan_id));
            Collections.sort(loanInfos);
            ret = "删除成功!";
        } catch (Exception e) {
            log.error("业务 - 贷款删除：异常 => loanDelParamStr：【{}】| {}", loanDelParamStr, e);
            ret = "删除异常!";
        }
        return ret;
    }


    /**
     * 文档填充数据 -> 导出到指定目录
     *
     * @param filePath 文档导出指定目录
     * @return 操作结果
     */
    public String doExprotLoan(String filePath, String loan_id) {
        String ret = "";
        try {
            if (StringUtils.isEmpty(filePath) || StringUtils.isEmpty(loan_id)) {
                ret = "数据不合法，请重试！";
            } else {
                doHandl(filePath, loan_id);
                ret = "导出成功！目录：" + filePath;
            }
        } catch (Exception e) {
            ret = "导出异常：" + e.getMessage();
            log.error("业务 - 贷款导出：异常 ==> load_id：{}", loan_id, e);
        }
        return ret;
    }

    private void doHandl(String filePath, String loan_id) throws Exception {
        log.info("filling template file...");
        // 获取贷款信息
        LoanInfo loanInfo = loanInfos.stream().filter(loan -> loan_id.equals(loan.getId())).findFirst().orElse(null);

        // 获取客户信息
        PersonCustomer p_customer = personCustomers.stream().filter(p -> loanInfo.getLoan_repay_person().equals(p.getP_name())).findFirst().orElse(null);

        if (null == loanInfo || null == p_customer) {
            throw new Exception("贷款信息不存在！");
        }
        Map<String,String> replaceFileMap = new HashMap<>();
        replaceFileMap.putAll(template_base_Map);
        // 贷款方式 - 对应文件列表
        if(loanInfo.getLoan_mode() == 1){
            replaceFileMap.putAll(template_zizhu_map);
        }else if(loanInfo.getLoan_mode() == 2){
            // todo 加入 循环 对应的文件列表
        }else if(loanInfo.getLoan_mode() == 3){
            // todo 加入 特色产品 对应的文件列表
        }

        // 支付方式对应文件列表
        if(loanInfo.getLoan_pay_mode() == 2){
            // todo 加入 委托支付 对应文件列表
        }

        Set<Map.Entry<String, String>> entries = replaceFileMap.entrySet();
        for (Map.Entry<String, String> entry : entries) {
            // 获取模板文件
            String templatePath_A = Main.class.getResource("/").getPath() + "/template/" + entry.getKey();
            File templateFile_A = new File(templatePath_A);

            // 读取模板
            InputStream in = new FileInputStream(templateFile_A);
            OPCPackage srcPackage = OPCPackage.open(in);
            XWPFDocument doc = new XWPFDocument(srcPackage);

            Iterator<XWPFTable> it = doc.getTablesIterator();
            //表格内容替换添加
            Map<String, Object> replaceMap = createParaParamsMap(loanInfo, p_customer);
            XWPFDocument targetDoc = null;
            try {
                targetDoc = WordExportUtil.exportWord07(templatePath_A, replaceMap);
            } catch (Exception e) {
                e.printStackTrace();
            }
            // 输出目标文件
            File file = new File(filePath);
            //如果文件夹不存在则创建
            if (!file.exists()) {
                FileUtil.mkdir(file);
            }
            String targetPath_A = filePath + "/" + entry.getValue();
            OutputStream targetOS_A = new FileOutputStream(targetPath_A);
            targetDoc.write(targetOS_A);
            // 关闭流
            HtmlUtil.closeStream(in, targetOS_A);
            log.info("file handl successfully.result file in  =====>" + targetPath_A + " )");
        }
    }

    /**
     * 创建文本占位符需要替换的内容
     *
     * @return
     */
    public static Map<String, Object> createParaParamsMap(LoanInfo loanInfo, PersonCustomer customerInfo) {
        Map<String, Object> map = new HashMap<>();
        map.put("-dj-dk-jkr-xm", customerInfo.getP_name());
        map.put("-dj-dk-bzfs", display_Loan_assure_type(loanInfo.getLoan_assure_type()));
        map.put("-zh-dk-jkje-dx", loanInfo.getLoan_amount_upcase());
        map.put("-zh-dk-jkje-xx", String.valueOf(loanInfo.getLoan_amount_lowcase()));
        map.put("-zh-dk-dkqx", String.valueOf(loanInfo.getLoan_term()));
        map.put("-dj-dk-jkr-xb", display_gender(Integer.parseInt(customerInfo.getP_gender())));
        map.put("-dj-dk-jkr-sfz", customerInfo.getP_id());
        map.put("-dj-dk-jkr-jzdz", customerInfo.getP_dwell_add());
        map.put("-dj-dk-jkr-dh", customerInfo.getP_tel());
        map.put("-dj-dk-jkr-sfzdz", customerInfo.getP_id_add());
        map.put("-dj-dk-jkr-zyhy", customerInfo.getP_job());
        map.put("-dj-dk-jkr-jydz", customerInfo.getP_work_add());
        map.put("-dj-dk-jkr-zzc", customerInfo.getP_total_asset());
        map.put("-dj-dk-jkr-zfz", customerInfo.getP_total_debt());
        map.put("-dj-dk-jkr-jzc", customerInfo.getP_net_asset());
        map.put("-dj-dk-jkr-qnjtjsr", customerInfo.getP_last_year_family_net_asset());
        map.put("-dj-dk-yt", loanInfo.getLoan_for_use());
        map.put("-zh-dk-hkly", loanInfo.getLoan_repay_src());
        map.put("-zh-dk-qsrq", loanInfo.getLoan_start_date());
        map.put("-zh-dk-zzrq", loanInfo.getLoan_end_date());
        map.put("-zh-dk-sqr", loanInfo.getLoan_apply_time());
        map.put("-zh-dk-hkfs", display_Loan_repay_mode(loanInfo.getLoan_repay_mode()));
        map.put("-zh-dk-zhth", loanInfo.getLoan_main_contractno());
        map.put("-zh-dk-chth", loanInfo.getLoan_sub_contractno());
        map.put("-zh-dk-htr", loanInfo.getLoan_contract_date());
        // 保证信息
        map.put("-zh-dk-bzr-xm", loanInfo.getLoan_assure_person());
        map.put("-dj-dk-bzr-xb", display_gender(Integer.parseInt(loanInfo.getLoan_assure_person_gender())));
        map.put("-dj-dk-bzr-jzdz", loanInfo.getLoan_person_address());
        map.put("-dj-dk-bzr-sfz", loanInfo.getLoan_person_id());

        // 贷款方式：循环方式 ==> 附加项
        map.put("-dj-dk-bcqsrq", loanInfo.getLoan_this_start_date());
        map.put("-dj-dk-bczzrq", loanInfo.getLoan_this_end_date());
        map.put("-dj-dk-bcjkys", loanInfo.getLoan_this_months());
        // 贷款方式：特色产品 ==> 附加项
        map.put("-dj-dk-stcp", loanInfo.getLoan_special_prod_type());
        map.put("-dj-dkr-khlx", loanInfo.getLoan_borrower_type());
        // 支付方式：委托 ==> 附加项
        map.put("-dj-dk-wt-rq", loanInfo.getLoan_entrust_pay_date());
        map.put("-dj-dk-wt-je", loanInfo.getLoan_entrust_pay_amount());
        map.put("-dj-dk-wt-skdw", loanInfo.getLoan_entrust_pay_payee());
        map.put("-dj-dk-wt-skzh", loanInfo.getLoan_entrust_pay_receipt_account());
        map.put("-dj-dk-wt-khh", loanInfo.getLoan_entrust_pay_receipt_deposit());

        map.put("-zh-dk-yll", loanInfo.getLoan_m_rate());
        map.put("-dj-dk-zffs", display_Loan_pay_mode(loanInfo.getLoan_pay_mode()));
        map.put("-zh-dk-lljd", loanInfo.getLoan_rate_plus_point());
        map.put("-zh-dk-sp", loanInfo.getLoan_approve_time());
        map.put("-zh-dk-zsxje", String.valueOf(loanInfo.getLoan_total_credit_amount()));
        map.put("-zh-dk-dshrs", String.valueOf(loanInfo.getLoan_review_person_num()));
        map.put("-zh-dk-yhkh", loanInfo.getLoan_person_carno());
        map.put("-dj-dk-jkr-csrq", displayBirthDate(customerInfo.getP_id()));

        return map;
    }

    private static String display_Loan_repay_mode(Integer type) {
        String result = "";
        switch (type) {
            case 1: {
                result = "等额本息";
                break;
            }
            case 2: {
                result = "等额本金";
                break;
            }
            case 3: {
                result = "按月结息";
                break;
            }
            case 4: {
                result = "到期还本、计划还款";
                break;
            }
        }
        return result;
    }

    private static String display_Loan_assure_type(Integer type) {
        String result = "";
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

    private static String display_Loan_pay_mode(Integer type) {
        String result = "";
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

    private static String display_gender(Integer type) {
        String result = "";
        switch (type) {
            case 1: {
                result = "男";
                break;
            }
            case 0: {
                result = "女";
                break;
            }
        }
        return result;
    }

    public static String displayBirthDate(String strID) {
        String strYear = "";
        String strMonth = "";
        String strDay = "";

        if (strID.length() == 15) {
            strYear = "19" + strID.substring(6, 8);
            strMonth = strID.substring(8, 10);
            strDay = strID.substring(10, 12);
        }

        if (strID.length() == 18) {
            strYear = strID.substring(6, 10);
            strMonth = strID.substring(10, 12);
            strDay = strID.substring(12, 14);
        }
        return strYear + "年" + strMonth + "月" + strDay + "日";
    }


    /**
     * 恢复数据
     *
     * @return 是否成功
     */
    public static Boolean restoreData() {
        String dataBase64 = null;
        Map<String, String> dataMap = null;
        try {
            dataBase64 = FileUtil.readString(dataFilePath, StandardCharsets.UTF_8);
            String dataJson = new String(Base64.getDecoder().decode(dataBase64));
            dataMap = JSONObject.parseObject(dataJson, new TypeReference<Map<String, String>>() {
            });
            String personCustomerStr = dataMap.get("person");
            String entCustomerStr = dataMap.get("ent");
            String loanInfoStr = dataMap.get("loan");
            personCustomers = JSONObject.parseObject(personCustomerStr, new TypeReference<List<PersonCustomer>>() {
            });
            entCustomers = JSONObject.parseObject(entCustomerStr, new TypeReference<List<PersonCustomer>>() {
            });
            loanInfos = JSONObject.parseObject(loanInfoStr, new TypeReference<List<LoanInfo>>() {
            });
        } catch (Exception e) {
            log.error("数据恢复失败：", e);
            return false;
        }
        log.info("启动 - 数据恢复：成功 => {}", dataBase64);
        return true;
    }


    /**
     * 备份数据
     *
     * @return 是否成功
     */
    public static boolean backupData() {
        Map<String, String> dataMap = null;
        String dataBase64 = null;
        try {
            String personCustomerStr = JSON.toJSONString(personCustomers);
            String entCustomerStr = JSON.toJSONString(entCustomers);
            String loanInfoStr = JSON.toJSONString(loanInfos);
            dataMap = new HashMap<String, String>() {{
                put("person", personCustomerStr);
                put("ent", entCustomerStr);
                put("loan", loanInfoStr);
            }};
            String dataJson = JSON.toJSONString(dataMap);
            dataBase64 = Base64.getEncoder().encodeToString(dataJson.getBytes());
            FileUtil.writeString(dataBase64, dataFilePath, StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error("数据恢复失败：", e);
            return false;
        }
        log.info("退出 - 数据备份：成功 => {}", dataBase64);
        return true;
    }

}
