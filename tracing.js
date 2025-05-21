'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { AwsXRayIdGenerator } = require('@opentelemetry/id-generator-aws-xray');
const { AwsXRayPropagator } = require('@opentelemetry/propagator-aws-xray');
const { Resouce } = require('@opentelemetry/resources');
const { SEMRESATTRS_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');

// Configure the SDK
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [getNodeAutoInstrumentations({
    // Optionally, disable specific instrumentations:
    // '@opentelemetry/instrumentation-fs': { enabled: false },
  })],
  idGenerator: new AwsXRayIdGenerator(),
  textMapPropagator: new AwsXRayPropagator(),
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'my-express-app', // Set your service name
  }),
});

// Initialize the SDK and register with the OpenTelemetry API
sdk
  .start()
  .then(() => {
    console.log('Tracing initialized');
  })
  .catch((error) => console.log('Error initializing tracing: ', error));

// Gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing: ', error))
    .finally(() => process.exit(0));
});

module.exports = sdk;
