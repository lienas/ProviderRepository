#Building the Backend
## Prerequisites
###Java Version
to build the jar JAVA Version 11 necessary
make sure that JAVA_HOME points to the correct jdk-version
you may set your JAVA_HOME with the following commands

**Windows** = `SET JAVA_HOME=[directory] `

**UNIX**= `EXPORT JAVA_HOME=[directory]` or `$ sudo update-alternatives --config java`
### Docker
You need Docker on yout machine to create an image
see https://www.docker.com/get-started

## Build executable jar
if java 11 is defined by the environment variable you simple run
`mvn install`
This creates a jar-File in the target -Folder

## Build Docker Image
`mvnw spring-boot:build-image`

You can check the image with `docker images`
The image should be something like `prepo:[version]`

Run the image with `docker run -p 8080:8080 prepo:0.0.1-SNAPSHOT` 
(where 0.0.1-SNAPSHOT is the version)
