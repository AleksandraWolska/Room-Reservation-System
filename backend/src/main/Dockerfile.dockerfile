# Use official Maven image for the build environment
FROM maven:3.8.2-openjdk-11 as build
WORKDIR /app
COPY . /app
RUN mvn clean package

# Use official openjdk image for runtime
FROM openjdk:11-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar /app/myapp.jar
ENTRYPOINT ["java", "-jar", "/app/myapp.jar"]