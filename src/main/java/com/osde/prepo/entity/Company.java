package com.osde.prepo.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;
    private String ownerId; // Id of the user, who created the entry
    private String name; // Company Name
    private String city; // City where the company resides
    private String country; // Country where the company resides
    @Column(length = 500)
    private String profile; // short profile of the company
    private String logoUrl; // Url to logo
}
