package com.osde.prepo.repository;

import com.osde.prepo.entity.Company;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompanyRepository extends PagingAndSortingRepository<Company, Long> {
    List<Company> findByOwnerId(@Param("ownerId") String ownerId);
}
