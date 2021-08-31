package site.ryanc.ofc.tool.model.ofct;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.HexUtil;
import lombok.Data;
import org.jetbrains.annotations.NotNull;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 贷款信息
 * @author Ryan
 * @Date 2021年8月28日18:32:09
 */
@Data
public class LoanInfo implements Comparable<LoanInfo> {

    /** 主键id 单机版应用->故：不考虑线程安全问题 */
    private String id = HexUtil.toHex(System.currentTimeMillis());

    /** 客户类型 */
    private Integer loan_customer_type;
    /** 保证方式 */
    private Integer loan_assure_type;
    /** 贷款方式 */
    private Integer loan_mode;
    /** 支付方式 */
    private Integer loan_pay_mode;

    /** 还款方式 */
    private Integer loan_repay_mode;
    /** 还款人 */
    private String loan_repay_person;
    /** 借款人卡号 */
    private String loan_person_carno;
    /** 借款用途 */
    private String loan_for_use;
    /** 还款来源 */
    private String loan_repay_src;
    /** 贷款金额大写 */
    private String loan_amount_upcase;
    /** 贷款金额小写 */
    private BigDecimal loan_amount_lowcase;
    /** 总授信金额 */
    private BigDecimal loan_total_credit_amount;
    /** 贷款利率加点 */
    private String loan_rate_plus_point;
    /** 贷款期限 */
    private Integer loan_term;
    /** 贷款起始日期 */
    private String loan_start_date;
    /** 贷款终止日期 */
    private String loan_end_date;
    /** 贷款月利率 */
    private String loan_m_rate;
    /** 主合同号 */
    private String Loan_main_contractno;
    /** 从合同号 */
    private String loan_sub_contractno;

    /** 保证人姓名 */
    private String loan_assure_person;
    /** 保证人性别 */
    private String loan_assure_person_gender;
    /** 保证人住址 */
    private String loan_person_address;

    /** 申请贷款时间 */
    private String loan_apply_time;
    /** 贷审会成员数量 */
    private Integer loan_review_person_num;
    /** 审批贷款时间 */
    private String loan_approve_time;
    /** 合同日期 */
    private String loan_contract_date;
    /**  创建时间 */
    private Date ctime = new Date();


    @Override
    public int compareTo(@NotNull LoanInfo o) {
        if(DateUtil.second(o.getCtime()) > DateUtil.second(ctime)){
            return -1;
        }else if(DateUtil.second(o.getCtime()) < DateUtil.second(ctime)){
            return 1;
        }else{
            return 0;
        }
    }
}
