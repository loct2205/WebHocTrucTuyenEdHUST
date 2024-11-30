# Stage 1: Build the JAR file
FROM maven:3.8.5-openjdk-17 AS build

# Copy the source code
COPY pom.xml .
COPY ./src ./src

# Build the application
RUN mvn clean install -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-alpine

RUN apk add --no-cache ffmpeg

# Copy the JAR from the build stage
COPY --from=build ./target/backend-0.0.1-SNAPSHOT.jar app.jar

# Copy the firebase.config.json file to the /src/main/resources directory in the container
COPY src/main/resources/firebase.config.json /src/main/resources/firebase.config.json
RUN if [ ! -f /usr/bin/ffprobe ]; then echo "ffprobe not found!" && exit 1; fi

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]