package com.osde.prepo.entity;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;
    private String name;
    private String city;
    private String profile;

    public Company(Long companyId, String name, String city, String profile) {
        this.name = name;
        this.city = city;
        this.profile = profile;
    }

    public Company() {

    }
}
