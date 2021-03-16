package com.osde.prepo.repository;

import com.osde.prepo.entity.Company;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface CompanyRepository extends PagingAndSortingRepository<Company,Long> {}
