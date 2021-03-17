package com.osde.prepo.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode
public class Company {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    private String ownerId; // Id of the user, who created the entry

    @NotNull(message = "Please provide a name for the company")
    private String name; // Company Name

    private String city; // City where the company resides
    private String country; // Country where the company resides

    @Column(length = 500)
    private String profile; // short profile of the company
    private String logoUrl; // Url to logo

    public Company(String ownerId, String name, String city, String country, String profile, String logoUrl) {
        this.ownerId = ownerId;
        this.name = name;
        this.city = city;
        this.country = country;
        this.profile = profile;
        this.logoUrl = logoUrl;
    }
}
