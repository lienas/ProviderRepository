#Upload-Service
## description
The Upload-Service is an endpoint to fetch a presigned url for uploading images to AWS-S3 service
It uses a Lambda-Function which is triggered by AWS API-Gateway


## endpoint
https://kkvpvkb0r1.execute-api.eu-central-1.amazonaws.com/dev

To use the endpoint a valid Bearer-token must be added to header of the request.
if everything is fine the following response is returned if you submit a **_post request_** to the endpoint:

```json
{
    statusCode: 201,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    href: attachmentUrl
}

```
