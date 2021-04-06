#Provider-Repository Client
This client delivers a React-SPA to manage the Provider-Repository for the Portal www.outsourcing.de.
It depends on the WebServices-API of the repository and the Upload-Service.

For a good user-experience, we use **Material-UI**.
The Client was created using [Create React App](#getting-started-with-create-react-app)

## configuration
There are **2 configuration files** in folder `client/src/config`

### auth0.js
**auth0.js** is for  authentication and one for the endpoints 
(if you change this configuration- you have also to change the security configuration in the company services)

###endpoint.js
This file contains the endpoints for the used services (company and upload)
```
//endpoint of serverless-app to get a presigned url to upload a logo
// the signature of the endpoint is  [UPLOAD_URL]/logo/{id}/attachment
export const S3_UPLOAD_URL =  "https://kkvpvkb0r1.execute-api.eu-central-1.amazonaws.com/dev"
// the base url for the s3 bucket to fecth the logo
// the signature of the endpoint is  [S3_DOWNLOAD_URL]/logo_{companyId}
export const S3_DOWNLOAD_URL = "https://prepo-logo-dev.s3.eu-central-1.amazonaws.com"
//endpoint for managing company entries
export const COMPANY_SERVICE_URL = "http://prepo-api-test.outsourcing.de/api/companies" //"http://localhost:8080/api/companies"
```

## start client
from the root folder run `npm install` and then `npm run start`.
The client runs on port 3000.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

####`yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
