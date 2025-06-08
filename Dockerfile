# ---- Build Stage ----
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

# Copy Gradle wrapper and build files
COPY backend-spring/gradlew backend-spring/build.gradle backend-spring/settings.gradle ./
COPY backend-spring/gradle ./gradle

# Download dependencies
RUN ./gradlew dependencies --no-daemon

# Copy the rest of the source code
COPY backend-spring/src ./src

# Build the Spring Boot application
RUN ./gradlew bootJar --no-daemon

# ---- Run Stage ----
FROM eclipse-temurin:17-jre

WORKDIR /app

# Install Python 3 and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Copy the built jar from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Copy the Python AI engine
COPY ../ai_engine_python ./ai_engine_python

# Install Python dependencies if requirements.txt exists
RUN if [ -f ./ai_engine_python/requirements.txt ]; then pip3 install -r ./ai_engine_python/requirements.txt; fi

EXPOSE 8080

ENV JAVA_HOME=/opt/java/openjdk

ENTRYPOINT ["java", "-jar", "app.jar"]
