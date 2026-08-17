variable "service_name" { type = string }
variable "environment" { type = string }
variable "aws_region" { type = string }
variable "cluster_arn" { type = string }
variable "image" { type = string }
variable "subnet_ids" { type = list(string) }
variable "security_group_ids" { type = list(string) }
variable "container_port" { type = number default = 8080 }
variable "liveness_path" { type = string default = "/health/live" }
variable "cpu" { type = number default = 512 }
variable "memory" { type = number default = 1024 }
variable "desired_count" { type = number default = 2 }
variable "log_retention_days" { type = number default = 30 }
variable "health_interval" { type = number default = 30 }
variable "health_timeout" { type = number default = 5 }
variable "health_retries" { type = number default = 3 }
variable "health_start_period" { type = number default = 60 }
variable "health_check_grace_period_seconds" { type = number default = 60 }
variable "environment_variables" { type = map(string) default = {} }
