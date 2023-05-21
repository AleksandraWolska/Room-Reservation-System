# Fetching latest version of Java
FROM openjdk:18
 
# Setting up work directory
WORKDIR /app

# Copy the jar file into our app
COPY ./target/RoomReservation-0.0.1-SNAPSHOT.jar /app

# Exposing port 8080
EXPOSE 8080

# Starting the application
CMD ["java", "-jar", "RoomReservation-0.0.1-SNAPSHOT.jar"]

# run with command
#sudo docker run -it -p 8080:8080 --network=host room-reservation-system-backend