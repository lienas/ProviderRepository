import {createLogger} from "../utils/logger";
import * as AWS from "aws-sdk";
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)


const logger = createLogger('business-layer')
const bucket = process.env.BUCKET_NAME

function createS3Client() {
    if (process.env.IS_OFFLINE) {
        logger.info('Creating local S3 instance')
        return new XAWS.S3({
            s3ForcePathStyle: true,
            accessKeyId: 'S3RVER', // This specific key is required when working offline
            secretAccessKey: 'S3RVER',
            endpoint: new AWS.Endpoint('http://localhost:4569'),
        })
    }
    logger.info('Creating S3 instance')
    return new XAWS.S3({signatureVersion: 'v4'})
}

export async function getUploadUrl(companyId: string, userId: string): Promise<any> {
    logger.info('get AttachmentUrl', {'bucket': bucket, 'companyId': companyId, 'userId': userId})
    const s3Client = createS3Client();
    let attachmentUrl

    try {
        //get the download-url
        attachmentUrl = await s3Client.getSignedUrl('getObject', {
                Bucket: bucket,
                Key: companyId
            }
        )

        logger.info('received AttachmentUrl', {'url': attachmentUrl})


    } catch (err) {
        logger.error('there was an error updating todo-item', {'error': err})
    }

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        href: attachmentUrl
    }
}
