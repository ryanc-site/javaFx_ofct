package site.ryanc.ofc.tool.model.ofct;

import java.util.Date;

import org.jetbrains.annotations.NotNull;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.HexUtil;
import lombok.Data;

/**
 * 客户管理 - 个人客户信息实体类
 *
 * @author Ryan
 * @since 2021-08-25
 */
@Data
public class PersonCustomer implements Comparable {

    /** 主键id 单机版应用->故：不考虑线程安全问题 */
    private String id = HexUtil.toHex(System.currentTimeMillis());
    /**  姓名 */
    private String p_name;
    /**  性别 */
    private String p_gender;
    /**  婚姻情况 */
    private String p_marital;
    /**  电话 */
    private String p_tel;
    /**  身份证 */
    private String p_id;
    /**  身份证地址 */
    private String p_id_add;
    /**  户籍地址 */
    private String p_hukou_add;
    /**  居住地址 */
    private String p_dwell_add;
    /**  工作地址 */
    private String p_work_add;
    /**  职位（行业） */
    private String p_job;
    /**  月收入 */
    private String p_m_in;
    /**  年收入 */
    private String p_y_in;
    /**  总资产 */
    private String p_total_asset;
    /**  总负债 */
    private String p_total_debt;
    /**  净资产 */
    private String p_net_asset  ;
    /**  上年家庭净收入 */
    private String p_last_year_family_net_asset;
    /**  创建时间 */
    private Date ctime = new Date();


    @Override
    public int compareTo(@NotNull Object o) {
        PersonCustomer srcObj = (PersonCustomer)o;
        if(DateUtil.second(srcObj.getCtime()) > DateUtil.second(ctime)){
            return -1;
        }else if(DateUtil.second(srcObj.getCtime()) < DateUtil.second(ctime)){
            return 1;
        }else{
            return 0;
        }
    }
}
