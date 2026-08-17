resource "aws_iam_role" "lambda" {
  name               = "${var.service_name}-${var.environment}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals { type = "Service" identifiers = ["lambda.amazonaws.com"] }
  }
}

resource "aws_cloudwatch_log_group" "this" {
  name              = "/aws/lambda/${var.service_name}-${var.environment}"
  retention_in_days = var.log_retention_days
}

resource "aws_lambda_function" "this" {
  function_name = "${var.service_name}-${var.environment}"
  role          = aws_iam_role.lambda.arn
  runtime       = var.runtime
  handler       = var.handler
  filename      = var.artifact_path
  source_code_hash = filebase64sha256(var.artifact_path)
  memory_size   = var.memory_size
  timeout       = var.timeout

  environment { variables = var.environment_variables }

  dynamic "vpc_config" {
    for_each = length(var.subnet_ids) > 0 ? [1] : []
    content {
      subnet_ids         = var.subnet_ids
      security_group_ids = var.security_group_ids
    }
  }

  depends_on = [aws_cloudwatch_log_group.this]
}
