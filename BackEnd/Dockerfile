FROM openjdk:20-oracle


COPY ./target/backend.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "backend.jar"]