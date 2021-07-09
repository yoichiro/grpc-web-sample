/**
 * @fileoverview gRPC-Web generated client stub for echo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as echo_pb from './echo_pb';


export class EchoClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGet = new grpcWeb.AbstractClientBase.MethodInfo(
    echo_pb.EchoResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    echo_pb.EchoResponse.deserializeBinary
  );

  get(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/echo.Echo/Get',
      request,
      metadata || {},
      this.methodInfoGet);
  }

  methodInfoSend = new grpcWeb.AbstractClientBase.MethodInfo(
    echo_pb.EchoResponse,
    (request: echo_pb.EchoRequest) => {
      return request.serializeBinary();
    },
    echo_pb.EchoResponse.deserializeBinary
  );

  send(
    request: echo_pb.EchoRequest,
    metadata: grpcWeb.Metadata | null): Promise<echo_pb.EchoResponse>;

  send(
    request: echo_pb.EchoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: echo_pb.EchoResponse) => void): grpcWeb.ClientReadableStream<echo_pb.EchoResponse>;

  send(
    request: echo_pb.EchoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: echo_pb.EchoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/echo.Echo/Send',
        request,
        metadata || {},
        this.methodInfoSend,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/echo.Echo/Send',
    request,
    metadata || {},
    this.methodInfoSend);
  }

}

