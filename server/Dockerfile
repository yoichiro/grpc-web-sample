FROM golang:1.16.0

ADD . /go/src
WORKDIR /go/src
RUN go build -o /go/bin/echo-server

CMD ["/go/bin/echo-server"]
