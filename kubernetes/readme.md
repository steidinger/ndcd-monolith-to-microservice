The metric server required for autoscaling is not installed automatically on AWS.
To install it, use `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.3.6/components.yaml`
(check for newer release before installing).

Could not deploy docker images to cluster created through the AWS console,
using eksctl to create the cluster fixed this. eksctl creates a node group with
2 t4.medium instances.

The provided project doesn't allow uploading the same image twice,
which makes testing a bit annoying. Use S3 console to delete images
from S3 bucket in case the image was uploaded but the post wasn't stored.

I did not use the ssh access, so next time I could skip creating the ssh key pair.

```shell
aws ec2 create-key-pair --region eu-central-1 --key-name debian
eksctl create cluster --name udagram-dev --region eu-central-1 --with-oidc --ssh-access --ssh-public-key debian --managed
kubectl apply -f ./udagram-secrets.yaml
kubectl apply -f ./feed-deployment.yaml
kubectl apply -f ./feed-service.yaml
kubectl apply -f ./reverse-proxy-deployment.yaml
kubectl apply -f ./reverse-proxy-services.yaml
kubectl apply -f ./users-deployment.yaml
kubectl apply -f ./users-service.yaml
kubectl apply -f ./frontend-deployment.yaml
kubectl apply -f ./frontend-service.yaml
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.3.6/components.yaml
kubectl autoscale deployment udagram-api-feed --cpu-percent=20 --min=1 --max=2
```

The secrets file looks like this, using stringData, the values can be provided directly
without encoding:
``` yaml
apiVersion: v1
kind: Secret
metadata:
  name: udagram-secrets
type: Opaque
stringData:
  postgres_password: password
  jwt_secret: something
  aws_access_key_id: keyId
  aws_secret_access_key: secret
  
```