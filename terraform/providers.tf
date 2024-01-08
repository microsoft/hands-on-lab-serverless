terraform {
  required_providers {
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.43.0"
    }

    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.75.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.5.1"
    }
  }

  # backend "local" {}
  backend "azurerm" {}
}

provider "azurerm" {
  features {}
}
