variable "environment" {
  description = "The environment deployed"
  type        = string
  default     = "lab"
  validation {
    condition     = can(regex("(lab|dev|stg|prd)", var.environment))
    error_message = "The environment value must be a valid."
  }
}

variable "application" {
  default     = "hol"
  description = "Name of the application"
  type        = string
}

variable "location" {
  description = "Azure deployment location"
  type        = string
  default     = "westeurope"
}

variable "owner" {
  description = "The name of the project's owner"
  type        = string
  default     = "ms"
}

variable "scm" {
  description = "The source code repository name"
  type        = string
  default     = "hands-on-lab-serverless"
}

variable "resource_group_name_suffix" {
  type        = string
  default     = "01"
  description = "The resource group name suffix"
}

variable "tags" {
  type        = map(any)
  description = "The custom tags for all resources"
  default     = {}
}

variable "full_deployment" {
  description = "If true, the full deployment will be executed"
  type        = bool
  default     = false
}

variable "swa_tier" {
  description = "The default tier for the Static Web App service. This should be set to Standard while deploying multiple time to a subscription because of the maximum number of resources allowed per subscription."
  type        = string
  default     = "Free"
}

variable "swa_size" {
  description = "The default size for the Static Web App service. This should be set to Standard while deploying multiple time to a subscription because of the maximum number of resources allowed per subscription."
  type        = string
  default     = "Free"
}

variable "web_pubsub_sku" {
  description = "The default sku for the Web PubSub service. This should be set to Standard_S1 while deploying multiple time to a subscription because of the maximum number of resources allowed per subscription."
  type        = string
  default     = "Free_F1"
}

variable "user_id" {
  description = "The user id to assign the Contributor role to the resource group"
  type        = string
  default     = ""
}

variable "cohort_suffix" {
  description = "[Optional] A cohort suffix for a specific lab to be edited. Helps with keeping track of labs' cohorts in the same subscription"
  type        = string
  default     = ""
}
