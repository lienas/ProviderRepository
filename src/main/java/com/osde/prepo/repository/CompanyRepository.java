package com.osde.prepo.repository;

import com.osde.prepo.entity.Company;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CompanyRepository extends PagingAndSortingRepository<Company, Long> {
}
