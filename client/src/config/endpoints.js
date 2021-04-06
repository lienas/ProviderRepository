//endpoint of serverless-app to get a presigned url to upload a logo
// the signature of the endpoint is  [UPLOAD_URL]/logo/{id}/attachment
export const S3_UPLOAD_URL =  "https://kkvpvkb0r1.execute-api.eu-central-1.amazonaws.com/dev"
// the base url for the s3 bucket to fecth the logo
// the signature of the endpoint is  [S3_DOWNLOAD_URL]/logo_{companyId}
export const S3_DOWNLOAD_URL = "https://prepo-logo-dev.s3.eu-central-1.amazonaws.com"
//endpoint for managing company entries
export const COMPANY_SERVICE_URL = "http://prepo-api-test.outsourcing.de/api/companies" //"http://localhost:8080/api/companies"
