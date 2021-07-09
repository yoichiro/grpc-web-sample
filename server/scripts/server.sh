#!/bin/sh

set -xe

go build
./grpc-web-sample
