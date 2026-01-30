FROM eclipse-temurin:21-jdk
ARG JAR_FILE=target/*.jar

WORKDIR /app
COPY ${JAR_FILE} /app/app.jar

# uploads는 볼륨 마운트로 관리 (docker run -v ./uploads:/app/uploads)
VOLUME /app/uploads

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dspring.profiles.active=${PROFILE:-dev} -jar /app/app.jar"]
