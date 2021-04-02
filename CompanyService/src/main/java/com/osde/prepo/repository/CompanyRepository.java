package com.osde.prepo.repository;

import com.osde.prepo.entity.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;


import java.util.List;

//todo: implement paging and sorting
// use PagingAndSortingRepository instead of CrudRepository
public interface CompanyRepository extends CrudRepository<Company, Long> {
    List<Company> findByOwnerId(@Param("ownerId") String ownerId);

    @Override
    @PreAuthorize("#s.ownerId == authentication.principal.subject")
    <S extends Company> S save(S s);

    @Override
    @PreAuthorize("#company.ownerId == authentication.principal.subject")
    void delete(Company company);
}
