# Provider Repository
The Provider API is shipped with the following 3 components:
 1. Company-Service (Spring-Boot-Rest-API) </br>
    details [here](CompanyService/Readme.md) 
2. Upload-Service (Serverless-App / Node-Js) </br>
   details [here](UploadService/Readme.md)
3. Client (ReactJs) </br>
details [here](client/README.md)
   
The Backendservices 1 and 2 are deployed to AWS. The client is noit production ready- but you may test all features.
The endpoints are configured in the client.

## Features
To use the service the user must be **authenticated**.
- Authenticate users with auth0-Service (register or use Google-account)
- List all company-entries owned by the authenticated user
- Create a company-entry
- Upload a logo- once the entry is created
- Edit a company-entry owned by the authenticated user
- Delete a company-entry owned by the authenticated user
