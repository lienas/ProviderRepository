package com.osde.prepo.controller;

import com.osde.prepo.entity.Company;
import com.osde.prepo.repository.CompanyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

/**
 * customer controller to override some Data Rest Response Handlers
 */
@RepositoryRestController
public class CompanyController {

    Logger logger = LoggerFactory.getLogger(CompanyController.class);
    private final CompanyRepository companyRepository;
    private final EntityLinks entityLinks;

    @Autowired
    public CompanyController(CompanyRepository repo, EntityLinks links) {
        companyRepository = repo;
        entityLinks = links;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/companies")
    public @ResponseBody
    ResponseEntity<?> getAllCompaniesForCurrentUser() {
        logger.info("custom implementation for get called!!");

//        List<Company> companies = new ArrayList<>();
//        companies = companyRepository.findByOwnerId("google-oauth2|107634743108791790006");
//
//        CollectionModel<Company> resources = CollectionModel.of(companies);
//        resources.add(linkTo(methodOn(CompanyController.class)
//                .getAllCompaniesForCurrentUser())
//                .withSelfRel());

        List<EntityModel<Company>> companies = companyRepository
                .findByOwnerId("google-oauth2|107634743108791790006")
                .stream()
                .map(this::generateLinks)
                .collect(Collectors.toList());


        return ResponseEntity.ok().body(companies);
    }

    private EntityModel<Company> generateLinks(Company company) {
        EntityModel<Company> resource = EntityModel.of(company);
        resource.add(entityLinks.linkToItemResource(Company.class, company.getCompanyId()).withSelfRel());
        resource.add(entityLinks.linkToCollectionResource(Company.class));




        return resource;
    }

}
