package com.reputation.service;

import com.reputation.dto.request.CreateCompanyRequest;
import com.reputation.dto.request.UpdateCompanyRequest;
import com.reputation.dto.response.CompanyResponse;
import com.reputation.model.Company;
import com.reputation.repository.CompanyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Unit-тесты для CompanyService")
class CompanyServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private CompanyService companyService;

    private Company testCompany;

    @BeforeEach
    void setUp() {
        testCompany = Company.builder()
            .id(1L)
            .name("Test Company")
            .description("Test Description")
            .industry("IT")
            .website("https://test.com")
            .isActive(true)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();
    }

    @Test
    @DisplayName("Создание компании с валидными данными должно сохранить компанию")
    void createCompany_WithValidData_SavesCompany() {
        CreateCompanyRequest request = new CreateCompanyRequest();
        request.setName("New Company");
        request.setDescription("New Description");
        request.setIndustry("Finance");
        request.setWebsite("https://newcompany.com");

        Company savedCompany = Company.builder()
            .id(2L)
            .name("New Company")
            .description("New Description")
            .industry("Finance")
            .website("https://newcompany.com")
            .isActive(true)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        when(companyRepository.save(any(Company.class))).thenReturn(savedCompany);

        CompanyResponse response = companyService.createCompany(request);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(2L);
        assertThat(response.getName()).isEqualTo("New Company");
        assertThat(response.getDescription()).isEqualTo("New Description");
        assertThat(response.getIndustry()).isEqualTo("Finance");
        assertThat(response.getWebsite()).isEqualTo("https://newcompany.com");
        assertThat(response.getIsActive()).isTrue();

        verify(companyRepository).save(any(Company.class));
    }

    @Test
    @DisplayName("Получение всех компаний должно вернуть список всех активных компаний")
    void getAllCompanies_ReturnsListOfCompanies() {
        Company company1 = Company.builder()
            .id(1L)
            .name("Company 1")
            .isActive(true)
            .build();
        Company company2 = Company.builder()
            .id(2L)
            .name("Company 2")
            .isActive(true)
            .build();

        List<Company> companies = Arrays.asList(company1, company2);
        when(companyRepository.findAll()).thenReturn(companies);

        List<CompanyResponse> result = companyService.getAllCompanies();

        assertThat(result).isNotNull();
        assertThat(result).hasSize(2);
        assertThat(result).extracting(CompanyResponse::getName)
            .containsExactly("Company 1", "Company 2");

        verify(companyRepository).findAll();
    }

    @Test
    @DisplayName("Получение компании по ID должно вернуть компанию")
    void getCompanyById_WithValidId_ReturnsCompany() {
        Long companyId = 1L;
        when(companyRepository.findById(companyId)).thenReturn(Optional.of(testCompany));

        CompanyResponse response = companyService.getCompanyById(companyId);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getName()).isEqualTo("Test Company");

        verify(companyRepository).findById(companyId);
    }

    @Test
    @DisplayName("Получение компании по несуществующему ID должно выбросить исключение")
    void getCompanyById_WithNonExistentId_ThrowsException() {

        Long companyId = 999L;
        when(companyRepository.findById(companyId)).thenReturn(Optional.empty());


        assertThatThrownBy(() -> companyService.getCompanyById(companyId))
            .isInstanceOf(RuntimeException.class)
            .hasMessageContaining("Company not found");

        verify(companyRepository).findById(companyId);
    }

    @Test
    @DisplayName("Обновление компании должно обновить данные компании")
    void updateCompany_WithValidData_UpdatesCompany() {
        Long companyId = 1L;
        UpdateCompanyRequest request = new UpdateCompanyRequest();
        request.setName("Updated Company");
        request.setDescription("Updated Description");
        request.setIndustry("Updated Industry");
        request.setIsActive(false);

        when(companyRepository.findById(companyId)).thenReturn(Optional.of(testCompany));
        when(companyRepository.save(any(Company.class))).thenAnswer(invocation -> {
            Company company = invocation.getArgument(0);
            return company;
        });

        CompanyResponse response = companyService.updateCompany(companyId, request);

        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("Updated Company");
        assertThat(response.getDescription()).isEqualTo("Updated Description");
        assertThat(response.getIndustry()).isEqualTo("Updated Industry");
        assertThat(response.getIsActive()).isFalse();

        verify(companyRepository).findById(companyId);
        verify(companyRepository).save(any(Company.class));
    }

    @Test
    @DisplayName("Удаление компании должно удалить компанию из репозитория")
    void deleteCompany_WithValidId_DeletesCompany() {
        Long companyId = 1L;
        when(companyRepository.existsById(companyId)).thenReturn(true);
        doNothing().when(companyRepository).deleteById(companyId);

        companyService.deleteCompany(companyId);

        verify(companyRepository).existsById(companyId);
        verify(companyRepository).deleteById(companyId);
    }

    @Test
    @DisplayName("Удаление несуществующей компании должно выбросить исключение")
    void deleteCompany_WithNonExistentId_ThrowsException() {
        Long companyId = 999L;
        when(companyRepository.existsById(companyId)).thenReturn(false);

        assertThatThrownBy(() -> companyService.deleteCompany(companyId))
            .isInstanceOf(RuntimeException.class)
            .hasMessageContaining("Company not found");

        verify(companyRepository).existsById(companyId);
        verify(companyRepository, never()).deleteById(anyLong());
    }
}

