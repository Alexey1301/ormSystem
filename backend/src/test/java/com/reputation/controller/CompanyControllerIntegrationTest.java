package com.reputation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reputation.model.Company;
import com.reputation.model.User;
import com.reputation.model.UserRole;
import com.reputation.repository.CompanyRepository;
import com.reputation.repository.UserRepository;
import com.reputation.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@DisplayName("Интеграционные тесты для CompanyController")
class CompanyControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private User adminUser;
    private User managerUser;
    private String adminToken;
    private String managerToken;
    private Company testCompany;

    @BeforeEach
    void setUp() {
        companyRepository.deleteAll();
        userRepository.deleteAll();

        adminUser = User.builder()
            .username("admin")
            .email("admin@example.com")
            .passwordHash(passwordEncoder.encode("password123"))
            .fullName("Admin User")
            .role(UserRole.ADMIN)
            .isActive(true)
            .build();
        userRepository.save(adminUser);

        managerUser = User.builder()
            .username("manager")
            .email("manager@example.com")
            .passwordHash(passwordEncoder.encode("password123"))
            .fullName("Manager User")
            .role(UserRole.MANAGER)
            .isActive(true)
            .build();
        userRepository.save(managerUser);

        adminToken = jwtTokenProvider.generateAccessToken(adminUser.getId());
        managerToken = jwtTokenProvider.generateAccessToken(managerUser.getId());

        testCompany = Company.builder()
            .name("Test Company")
            .description("Test Description")
            .industry("IT")
            .website("https://test.com")
            .isActive(true)
            .build();
        companyRepository.save(testCompany);
    }

    @Test
    @DisplayName("POST /api/companies с валидными данными и правами ADMIN должен создать компанию")
    void createCompany_WithValidDataAndAdminRole_CreatesCompany() throws Exception {
        String requestBody = """
            {
                "name": "New Company",
                "description": "New Description",
                "industry": "Finance",
                "website": "https://newcompany.com"
            }
            """;

        mockMvc.perform(post("/api/companies")
                .header("Authorization", "Bearer " + adminToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isCreated())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.name").value("New Company"))
            .andExpect(jsonPath("$.description").value("New Description"))
            .andExpect(jsonPath("$.industry").value("Finance"))
            .andExpect(jsonPath("$.website").value("https://newcompany.com"))
            .andExpect(jsonPath("$.isActive").value(true));

        assert companyRepository.findAll().stream()
            .anyMatch(c -> c.getName().equals("New Company"));
    }

    @Test
    @DisplayName("POST /api/companies без аутентификации должен вернуть 401")
    void createCompany_WithoutAuthentication_Returns401() throws Exception {
        String requestBody = """
            {
                "name": "New Company"
            }
            """;

        mockMvc.perform(post("/api/companies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/companies должен вернуть список всех компаний")
    void getAllCompanies_ReturnsListOfCompanies() throws Exception {
        Company company2 = Company.builder()
            .name("Company 2")
            .isActive(true)
            .build();
        companyRepository.save(company2);

        mockMvc.perform(get("/api/companies")
                .header("Authorization", "Bearer " + adminToken))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].name").exists())
            .andExpect(jsonPath("$[1].name").exists());
    }

    @Test
    @DisplayName("GET /api/companies/{id} с валидным ID должен вернуть компанию")
    void getCompanyById_WithValidId_ReturnsCompany() throws Exception {
        mockMvc.perform(get("/api/companies/" + testCompany.getId())
                .header("Authorization", "Bearer " + adminToken))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(testCompany.getId()))
            .andExpect(jsonPath("$.name").value("Test Company"))
            .andExpect(jsonPath("$.description").value("Test Description"));
    }

    @Test
    @DisplayName("GET /api/companies/{id} с несуществующим ID должен вернуть 404")
    void getCompanyById_WithNonExistentId_Returns404() throws Exception {
        mockMvc.perform(get("/api/companies/999")
                .header("Authorization", "Bearer " + adminToken))
            .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PUT /api/companies/{id} с валидными данными должен обновить компанию")
    void updateCompany_WithValidData_UpdatesCompany() throws Exception {
        String requestBody = """
            {
                "name": "Updated Company",
                "description": "Updated Description",
                "industry": "Updated Industry",
                "isActive": false
            }
            """;

        mockMvc.perform(put("/api/companies/" + testCompany.getId())
                .header("Authorization", "Bearer " + adminToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value("Updated Company"))
            .andExpect(jsonPath("$.description").value("Updated Description"))
            .andExpect(jsonPath("$.industry").value("Updated Industry"))
            .andExpect(jsonPath("$.isActive").value(false));

        Company updatedCompany = companyRepository.findById(testCompany.getId()).orElseThrow();
        assert updatedCompany.getName().equals("Updated Company");
        assert updatedCompany.getIsActive().equals(false);
    }

    @Test
    @DisplayName("DELETE /api/companies/{id} с правами ADMIN должен удалить компанию")
    void deleteCompany_WithAdminRole_DeletesCompany() throws Exception {
        mockMvc.perform(delete("/api/companies/" + testCompany.getId())
                .header("Authorization", "Bearer " + adminToken))
            .andExpect(status().isNoContent());

        assert companyRepository.findById(testCompany.getId()).isEmpty();
    }

    @Test
    @DisplayName("DELETE /api/companies/{id} с правами MANAGER должен вернуть 403")
    void deleteCompany_WithManagerRole_Returns403() throws Exception {
        mockMvc.perform(delete("/api/companies/" + testCompany.getId())
                .header("Authorization", "Bearer " + managerToken))
            .andExpect(status().isForbidden());

        assert companyRepository.findById(testCompany.getId()).isPresent();
    }
}

