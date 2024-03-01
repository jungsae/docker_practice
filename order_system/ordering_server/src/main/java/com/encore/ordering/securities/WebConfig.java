package com.encore.ordering.securities;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer
{
   @Override
   public void addCorsMappings(CorsRegistry corsRegistry)
   {
       corsRegistry.addMapping("/**")
               .allowedOrigins("http://localhost:8081")
//               .allowedOriginPatterns("http://example.com", "https://*.example.com") // 구체적인 출처 또는 패턴 지정
               .allowedMethods("*")
               .allowedHeaders("*")
               .allowCredentials(true);
   }
//   @Bean
//   public WebMvcConfigurer corsConfigurer() {
//       return new WebMvcConfigurer() {
//           @Override
//           public void addCorsMappings(CorsRegistry registry) {
//               registry.addMapping("/**")
//                       .allowedOrigins("*")
//                       .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                       .allowedHeaders("*")
//                       .allowCredentials(true);
//           }
//       };
//   }
}
