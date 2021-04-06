#Company Service
## Introduction
This API is a RestFull-Service build with Spring-Boot and JPA. It provides endpoint to manage the base data for a company.
The base data includes:
- <span style="color:#c9d200">**companyId**</span> unique identifier of the company
- <span style="color:#c9d200">**ownerId**</span> unique identifier of the user, who crated the entry
- <span style="color:#c9d200">**name**</span> of company
- <span style="color:#c9d200">**city**</span> where the company resides
- <span style="color:#c9d200">**country**</span> where the company resides
- freetext to describe what the company does (<span style="color:#c9d200">**profile**</span>)
- <span style="color:#c9d200">**logoUrl**</span> url to an logo stored in s3

## EndpointSecurity
Every User can read the profiles of all companies
Creating a new profile is only allowed for registered and logged in users.
Only the user who has created the profile can update or delete it.

App uses Spring security with integration to Auth0 for user management and token verification.

The necessary configuration can be found in application.properties.

```properties
#new security config

auth0.audience=https://provider-api
auth0.domain=dev-osde.eu.auth0.com
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://${auth0.domain}/
```

### configuration
the following envelope vars are necessary to set up security and database-connection:
## MySQL Connection
App was tested with mySQL 8 

|envelope-var|description|
|------------|------------|
|MYSQL_URL| database endpoint|
|MYSQL_DB_NAME|name of the database-must exist|
|MYSQL_USER|name of the db-user with necessary privileges for the database|
|MYSQL_PWD|password of the database user|

##endpoints
The endpoint are accessible from the `[base-url]/api`
### get all companies
GET: `[base-url]/api/companies`

### Get 1 vompany
GET: `[base-url]/api/companies/{Id_Company}`

### Add a new company
POST `[base-url]/api/companies/`
with a json payload in the body
```json
{
  "name": "[name of the comapany]",
  "city": "[city of residence]",
  "country": "[country of residence]",
  "profile": "[freetext to describe what the company does]",
  "logoUrl": "[optional path to the logo of the company]"    
}
```
**_name_** is a required parameter

### change a company
PUT: `[base-url]/api/companies/{Id_Company}`
with a json payload in the body 
```json
{
  "name": "[name of the comapany]",
  "city": "[city of residence]",
  "country": "[country of residence]",
  "profile": "[freetext to describe what the company does]",
  "logoUrl": "[optional path to the logo of the company]"    
}
```

##Building the Backend
### Prerequisites
####Java Version
to build the jar JAVA Version 11 necessary
make sure that JAVA_HOME points to the correct jdk-version
you may set your JAVA_HOME with the following commands

**Windows** = `SET JAVA_HOME=[directory] `

**UNIX**= `EXPORT JAVA_HOME=[directory]` or `$ sudo update-alternatives --config java`
#### Docker
You need Docker on yout machine to create an image
see https://www.docker.com/get-started

### Build executable jar
if java 11 is defined by the environment variable you simple run
`mvn install`
This creates a jar-File in the target -Folder

### Build Docker Image
`mvnw spring-boot:build-image`

You can check the image with `docker images`
The image should be something like `prepo:[version]`

Run the image with `docker run -p 8080:8080 prepo:0.0.1-SNAPSHOT` 
(where 0.0.1-SNAPSHOT is the version)

#### Kubernetes
There is a configuration under Deployment to deploy the app to kubernetes.
This configuration uses the public available docker-image `lienas/prepo-api:latest`

#### CI
There is also a **Travis-File** inside company-service to build new versions, 
when pushed to main repository
