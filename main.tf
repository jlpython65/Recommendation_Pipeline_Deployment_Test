terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 4.2.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "flask-project-app" {
  name = "flask-project:v1"
  build {
    context    = "."
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "flask-project-container" {
  name  = "running-fastapi-project-v1"
  image = docker_image.flask-project-app.image_id

  ports {
    internal = 8080
    external = 8080
  }
}