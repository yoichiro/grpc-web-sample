#!/bin/sh

set -xe

SERVER_OUTPUT_DIR=server/echo
CLIENT_OUTPUT_DIR=client/src/echo

mkdir -p ${SERVER_OUTPUT_DIR}
mkdir -p ${CLIENT_OUTPUT_DIR}

protoc --version
protoc --proto_path=proto echo.proto \
  --go_out=plugins="grpc:${SERVER_OUTPUT_DIR}" \
  --go_opt=module=github.com/tably/grpc-web-sample/echo \
  --js_out=import_style=commonjs:${CLIENT_OUTPUT_DIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_OUTPUT_DIR}
