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
A-->D
B-->C
C--presigned Url-->B
B--presigned Url-->A
D--presigned Url-->C
C-->D
````

### company service
API for client for CRUD operations on company objects

### upload service
generate a presigned url to upload an image

