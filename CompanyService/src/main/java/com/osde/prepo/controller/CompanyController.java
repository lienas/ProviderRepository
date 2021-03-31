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
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.stream.Collectors;

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
    ResponseEntity<?> getAllCompaniesForCurrentUser(Authentication authentication) {
        logger.info("custom implementation for get called!!");
        Object principal = authentication.getPrincipal();
        String Username = "";
        if (principal instanceof Jwt) {
            Username = ((Jwt) principal).getSubject();
        }
        logger.info("User = {}", Username);

        List<EntityModel<Company>> companies = companyRepository
                .findByOwnerId(Username)
                .stream()
                .map(this::generateLinks)
                .collect(Collectors.toList());

        CollectionModel<EntityModel<Company>> resource = CollectionModel.of(companies);
        resource.add(entityLinks.linkToCollectionResource(Company.class));
        //resource.add(entityLinks.linksToSearchResources(Company.class));
        return ResponseEntity.ok().body(resource);

    }


    private EntityModel<Company> generateLinks(Company company) {
        EntityModel<Company> resource = EntityModel.of(company);
        resource.add(entityLinks.linkToItemResource(Company.class, company.getCompanyId()).withSelfRel());
        resource.add(entityLinks.linkToCollectionResource(Company.class));


        return resource;
    }

}
