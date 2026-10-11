terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}


terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 4.2.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "fastapi" {
  name = "fastapi:v1"
  build {
    context    = "."
    dockerfile = "Dockerfile"
  }
}

# 1. Define the cloud provider
provider "aws" {
  region = "us-east-1"
}

# 2. Define the infrastructure resource
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0" # Example AMI ID
  instance_type = "t2.micro"

  tags = {
    Name = "ExampleInstance"
  }
}

# 3. Output data once the resource is created
output "instance_public_ip" {
  value       = aws_instance.example.public_ip
  description = "The public IP address of the server."
}
