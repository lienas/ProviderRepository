package com.osde.prepo.repository;

import com.osde.prepo.entity.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

//todo: implement paging and sorting
// use PagingAndSortingRepository instead of CrudRepository
public interface CompanyRepository extends CrudRepository<Company, Long> {
    List<Company> findByOwnerId(@Param("ownerId") String ownerId);
}
