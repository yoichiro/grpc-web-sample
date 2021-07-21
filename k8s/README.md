# How to deploy this sample to GKE

You can deploy this sample to GKE Autopilot on Google Cloud Platform by the following steps:

## Prerequisite

* Install `gcloud` command and execute `gcloud auth login` to authenticate with your account.
* Install `kubectl` command with `gcloud components install kubectl`.

Also, you need to launch this sample on your local environment by [the following steps](../README.md).

## Prepare a GCP project

Create a new GCP project on the GCP console. Then, enable the `Artifacts Repository API` and the `Kubernetes Engine API`.

Set the `PROJECT_ID` environment variable by the command below:

```bash
export PROJECT_ID=[YOUR_PROJECT_ID]
```

Also, set the `PROJECT_ID` to the gcloud command:

```bash
gcloud config set project $PROJECT_ID
```

## Create a new Artifacts Repository

Create a new Artifacts Repository named `echo` using the following command:

```bash
gcloud artifacts repositories create echo --repository-format=docker --location=asia-northeast1 --description="Docker repository"
```

You can specify any region you want on the `--location` option.

## Push docker images to the Artifacts Repository

First, authenticate to the Artifacts Repository:

```bash
gcloud auth configure-docker asia-northeast1-docker.pkg.dev
```

Currently, you have some docker images including: `echo-server`, `echo-client` and `envoy-proxy`. To deploy this sample to GKE, you need to push their images into the Artifacts Repository you made at the previous step. At this time, push the `echo-server` and the `envoy-proxy` images into the repository. You will deploy the `echo-client` image later, because you need to modify the code a bit of the client.

Execute the following commands to put a tag for each image:

```bash
docker tag echo-server:v1 asia-northeast1-docker.pkg.dev/$PROJECT_ID/echo/server:v1
docker tag envoy-proxy:v1 asia-northeast1-docker.pkg.dev/$PROJECT_ID/echo/proxy:v1
```

Then, push their images into the Artifacts Repository:

```bash
docker push asia-northeast1-docker.pkg.dev/$PROJECT_ID/echo/server:v1
docker push asia-northeast1-docker.pkg.dev/$PROJECT_ID/echo/proxy:v1
```

## Create a new GKE cluster

Now, the echo-server and the envoy-proxy images have been pushed into the Artifacts Repository. Next, create a new GKE cluster. Here, we choose GKE Autopilot. Execute the following command:

```bash
gcloud config set compute/region asia-northeast1
gcloud container clusters create-auto echo
```

It will take a long time until finishing the creation.

## Edit each yaml files

In the `k8s` directory, there are some yaml files, and they have a docker image name. For example:

```
image: asia-northeast1-docker.pkg.dev/grpc-web-sample/echo/client:v1
```

You need to change the names. Especially, replace the region name in the name with your specified region name.

## Deploy docker images for echo-server and envoy-proxy

Deploy the echo-server for the node of the cluster you created in the previous step. Execute the following commands:

```bash
gcloud container clusters get-credentials echo --zone asia-northeast1
cd k8s
kubectl apply -f server-deployment.yaml
```

You can know the status of the deploying by executing the following command:

```bash
kubectl get pods
```

If you see the `READY 1/1` and `STATUS Running` in the output, the deploying completed normally.

Next, deploy a service to access to the echo-server deployment:

```bash
kubectl apply -f server-service.yaml
```

If executing `kubectl get services`, you can see the deployed `echo-server` service.

In the same way, deploy the `envoy-proxy`:

```bash
kubectl apply -f envoy-deployment.yaml
kubectl apply -f envoy-service.yaml
```

You can confirm whether the load balancer has been deployed normally by executing the command `kubectl get services` and seeing that the EXTERNAL-IP exists. Here, take a note for the external IP address.

## Modify the code of the client

Currently, your client tries to access to the local host to communicate the envoy proxy. After deploying the client code to the GKE, the client should try to access to the envoy-proxy deployed into the GKE. That is, you need to change the target server from `localhost` to the IP address you took a note.

Open the `client/src/gRPCClient.ts` file with your text editor. You can find the following line:

```ts
export const gRPCClients: GRPCClients = {
  echoClient: new EchoClient("http://localhost:8080"),
};
```

Change the `localhost` to the external IP address you took a note (ex: `http://34.146.47.96:8080`). Then, save it.

## Build and push the client docker image

After editing the code, re-build and push the docker image. Execute the following commands:

```bash
cd ..
docker-compose build
docker tag echo-client:v1 asia-northeast1-docker.pkg.dev/$PROJECT_ID/echo/client:v1
docker push asia-northeast1-docker.pkg.dev/$PROJECT_ID/echo/client:v1
```

## Deploy the echo-client docker image

Next, deploy the echo-client docker image into the cluster by following commands:

```bash
cd k8s
kubectl apply -f client-deployment.yaml
```

Then, deploy a service to prepare a load balancer to access to the echo-client from external:

```bash
kubectl apply -f client-service.yaml
```

Get the external IP address of the echo-client service by executing the `kubectl get services`.

Well done! All have been deployed.

## Test

Open your web browser and access to the `http://[IP ADDRESS]/`. The `IP ADDRESS` is the external IP address of the echo-client.
