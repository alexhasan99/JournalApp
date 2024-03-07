package kurdistan.journalapp;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.slf4j.MDC;

import java.util.Collections;

@SpringBootApplication
@CrossOrigin("http://localhost:3000")
public class JournalAppApplication {
	private static final Logger logger = LogManager.getLogger(JournalAppApplication.class);

	public static void main(String[] args) {
		SystemOutToLogger.setup();
		SpringApplication app = new SpringApplication(JournalAppApplication.class);
		String containerName = System.getenv("CONTAINER_NAME");
		app.setDefaultProperties(Collections
				.singletonMap("container.name", containerName));
		logger.info("CONTAINER_NAME från miljövariabel: " + containerName);
		logger.info("Systemegenskap 'container.name': " + System.getProperty("container.name"));
		app.run(args);

	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins("http://localhost:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE")
						.allowCredentials(true);
			}
		};
	}
}
