FROM envoyproxy/envoy-dev

COPY envoy.yaml /etc/envoy/envoy.yaml

EXPOSE 9901 8081 8080

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml --log-level info
