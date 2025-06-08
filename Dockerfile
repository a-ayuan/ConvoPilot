# ---- Build Stage ----
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

COPY backend-spring/gradlew backend-spring/build.gradle backend-spring/settings.gradle ./
COPY backend-spring/gradle ./gradle

RUN ./gradlew dependencies --no-daemon

COPY backend-spring/src ./src

RUN ./gradlew bootJar --no-daemon

# ---- Run Stage ----
FROM eclipse-temurin:17-jre

WORKDIR /app

# Install Python 3, pip, and venv
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*

# Copy the built jar from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Copy the Python AI engine
COPY ../ai_engine_python ./ai_engine_python

# Set up Python virtual environment and install dependencies
RUN python3 -m venv /app/venv && \
    /app/venv/bin/pip install --upgrade pip && \
    if [ -f ./ai_engine_python/requirements.txt ]; then /app/venv/bin/pip install -r ./ai_engine_python/requirements.txt; fi

# Ensure the venv Python is used when calling python3
ENV PATH="/app/venv/bin:$PATH"

EXPOSE 8080

ENV JAVA_HOME=/opt/java/openjdk

ENTRYPOINT ["java", "-jar", "app.jar"]
