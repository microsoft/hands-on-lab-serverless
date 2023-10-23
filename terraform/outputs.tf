output "resource_group_name" {
  value = azurerm_resource_group.this.name
}

output "static_web_app_name" {
  value = azurerm_static_site.this.name
}