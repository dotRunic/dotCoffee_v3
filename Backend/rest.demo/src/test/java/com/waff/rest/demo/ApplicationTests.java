package com.waff.rest.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource("/applicationtest.properties")
class ApplicationTests {

	@Test
	void contextLoads() {
	}

}
