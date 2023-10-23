resource "azurerm_resource_group" "this" {
  name     = format("rg-%s", local.resource_suffix_kebabcase)
  location = var.location
  tags     = local.tags
}
