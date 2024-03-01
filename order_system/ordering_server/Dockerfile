FROM openjdk:11 as builder

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY src src

RUN ./gradlew bootJar

FROM openjdk:11

COPY --from=builder /app/build/libs/*.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]