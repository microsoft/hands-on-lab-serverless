resource "azurerm_web_pubsub" "this" {
  name                = format("wps%s", local.resource_suffix_lowercase)
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name

  sku      = var.web_pubsub_sku
  capacity = 1

  identity {
    type = "SystemAssigned"
  }
}