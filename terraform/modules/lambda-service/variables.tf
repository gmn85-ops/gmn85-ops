variable "service_name" { type = string }
variable "environment" { type = string }
variable "runtime" { type = string }
variable "handler" { type = string }
variable "artifact_path" { type = string }
variable "memory_size" { type = number default = 512 }
variable "timeout" { type = number default = 15 }
variable "log_retention_days" { type = number default = 30 }
variable "subnet_ids" { type = list(string) default = [] }
variable "security_group_ids" { type = list(string) default = [] }
variable "environment_variables" { type = map(string) default = {} }
