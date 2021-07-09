package main

import (
	"context"
	pb "github.com/tably/grpc-web-sample/echo"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"google.golang.org/protobuf/types/known/emptypb"
	"log"
	"net"
	"time"
)

const (
	port = ":9090"
)

type server struct {
	pb.UnimplementedEchoServer
	requests []*pb.EchoRequest
}

func (s *server) Get(_ *emptypb.Empty, stream pb.Echo_GetServer) error {
	previousLength := len(s.requests)
	for {
		currentLength := len(s.requests)
		if previousLength < currentLength {
			request := s.requests[currentLength - 1]
			log.Printf("Sent: %v", request)
			if err := stream.Send(&pb.EchoResponse{Message: request.GetMessage()}); err != nil {
				return err
			}
		}
		previousLength = currentLength
	}
}

func (s *server) Send(ctx context.Context, request *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Printf("Received: %v", request.GetMessage())
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	requestWithTimestamp := &pb.EchoRequest{Message: request.GetMessage() + ": " + timestamp}
	s.requests = append(s.requests, requestWithTimestamp)
	return &pb.EchoResponse{Message: request.GetMessage()}, nil
}

func main() {
	log.Printf("Listening to %v", port)
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterEchoServer(s, &server{})
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
