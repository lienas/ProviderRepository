# Deployment to Kubernetes Cluster
## Service structure

````mermaid
graph TB
A[client]
B[company service]
C[Upload-Service]
D[(S3)]
E[(mySQl)]
A-->B
B-->E
A--upload-->D
B-->C
D--presigned Url-->C
C--presigned Url-->A
````

### company service
API for client for CRUD operations on company objects

### upload service
generate a presigned url to upload an image

### Environments
Environment vars are submitted by [config-map](env-configmap_template.yaml)


