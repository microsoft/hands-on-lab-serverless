resource "azurerm_role_assignment" "this" {
  count                = var.user_id != "" ? 1 : 0
  scope                = azurerm_resource_group.this.id
  role_definition_name = "Contributor"
  principal_id         = var.user_id
}
