# AWS OpenTelemetry XRay Demo (Express)

A basic demonstration of using OpenTelemetry with AWS XRay in an Express application.

## Getting Started

```zsh
# Clone the repository
git clone git@github.com:thehouseplant/aws-otel-xray-express
```

## Running the Demo

```zsh
export OTEL_SERVICE_NAME="aws-otel-xray-express"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="http://localhost:4317"
export OTEL_PROPAGATORS="xray"

node --require @aws/aws-distro-opentelemetry-node-autoinstrumentation/register app.js
```
