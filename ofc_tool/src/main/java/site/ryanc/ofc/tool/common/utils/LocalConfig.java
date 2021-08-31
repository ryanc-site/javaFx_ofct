package site.ryanc.ofc.tool.common.utils;

import cn.hutool.core.io.resource.ClassPathResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;


public class LocalConfig {

    private static final Logger log = LoggerFactory.getLogger(LocalConfig.class);
    /**
     * 配置文件目录
     */
    private static final ClassPathResource resource = new ClassPathResource("classpath:cfg/task.properties");

    /**
     * 项目根目录
     */
    public static String realPath = null;

    /**
     * 配置文件：值列表
     */
    private static Properties properties = new Properties();

    static {
        try {
            properties.load(resource.getStream());
            realPath = Config.class.getResource("/").getPath();
            log.info("Config load complate！");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 读取对应key的值
     * @param key 配置key
     * @return String 配置value
     */
    public static String getConfig(String key) {
        return String.valueOf(properties.get(key));
    }
}
