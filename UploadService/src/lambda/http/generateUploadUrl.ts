import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import {createLogger} from "../../utils/logger";
import {getUploadUrl} from "../../businessLayer/uploadUrl";
import {getUserId} from "../utils";


const logger = createLogger('GetUploadUrl-API')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const companyId = event.pathParameters.companyId
    const userId = getUserId(event)

    logger.info('get upload url for ' + companyId)

    const url = await getUploadUrl(companyId, userId)

    logger.info('received upload url ' + url)

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            uploadUrl: url
        })
    }
}
