resource "azurerm_eventgrid_system_topic" "this" {
  count                  = var.full_deployment ? 1 : 0
  name                   = format("egst-audio-storage-%s", local.resource_suffix_kebabcase)
  resource_group_name    = azurerm_resource_group.this.name
  location               = azurerm_resource_group.this.location
  source_arm_resource_id = azurerm_storage_account.this.id
  topic_type             = "Microsoft.Storage.StorageAccounts"
}
