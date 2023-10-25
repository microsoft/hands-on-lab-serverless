resource "azurerm_key_vault" "this" {
  name                        = format("kv-%s", local.resource_suffix_kebabcase)
  location                    = azurerm_resource_group.this.location
  resource_group_name         = azurerm_resource_group.this.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get",
      "List"
    ]

    secret_permissions = [
      "Get",
      "List",
      "Set",
      "Get",
      "Delete",
      "Purge",
      "Recover"
    ]

    storage_permissions = [
      "Get",
      "List"
    ]
  }

  dynamic "access_policy" {
    for_each = var.user_id != "" ? [1] : []

    content {
      tenant_id = data.azurerm_client_config.current.tenant_id
      object_id = var.user_id

      key_permissions = [
        "Get",
        "List"
      ]

      secret_permissions = [
        "Get",
        "List"
      ]

      storage_permissions = [
        "Get",
        "List"
      ]
    }
  }

  access_policy {
    tenant_id = azurerm_logic_app_workflow.this.identity[0].tenant_id
    object_id = azurerm_logic_app_workflow.this.identity[0].principal_id

    key_permissions = [
      "Get",
      "List"
    ]

    secret_permissions = [
      "Get",
      "List"
    ]

    storage_permissions = [
      "Get",
      "List"
    ]
  }
}


resource "azurerm_key_vault_secret" "this" {
  name         = "SpeechToTextApiKey"
  value        = azurerm_cognitive_account.this.primary_access_key
  key_vault_id = azurerm_key_vault.this.id
}
