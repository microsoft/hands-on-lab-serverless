locals {
  generated_suffix          = coalesce(var.cohort_suffix, random_id.resource_group_name_suffix.hex)
  resource_suffix           = [lower(var.environment), substr(lower(var.location), 0, 2), substr(lower(var.application), 0, 3), lower(var.owner), local.generated_suffix, var.resource_group_name_suffix]
  resource_suffix_kebabcase = join("-", local.resource_suffix)
  resource_suffix_lowercase = join("", local.resource_suffix)

  cosmos_db_database_name  = "HolDb"
  cosmos_db_container_name = "audios_transcripts"

  tags = merge(
    var.tags,
    tomap(
      {
        "Environment"     = var.environment,
        "Location"        = var.location,
        "Scm"             = var.scm,
        "Application"     = var.application
        "Resource Suffix" = var.resource_group_name_suffix
        "Cohort Suffix"   = local.generated_suffix
      }
    )
  )
}
