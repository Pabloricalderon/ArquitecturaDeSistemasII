# Assignment 08 - Kubernetes con Minikube, ArgoCD y Traefik

## Tecnologías utilizadas

- Kubernetes
- Minikube
- Docker
- Traefik
- ArgoCD
- Helm
- YAML
- GitHub

## Dominios configurados


app.ricardo-calderon.com
argo.ricardo-calderon.com

## Comandos ejecutados
´´´txt
git checkout main
git pull origin main
git checkout -b assignment-08

minikube start --driver=docker
kubectl get nodes

kubectl apply -f k8s/namespaces.yaml

helm repo add traefik https://traefik.github.io/charts
helm repo update

helm upgrade --install traefik traefik/traefik \
  --namespace traefik \
  -f k8s/traefik/traefik-values.yaml

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

kubectl apply -f k8s/argocd/argocd-ingressroute.yaml

minikube docker-env | Invoke-Expression
docker build -t semana4-app:1.0 ./app

kubectl apply -f k8s/semana4-app/

kubectl get pods -A
kubectl get svc -A
kubectl get ingressroute -A
´´´txt
## Manifiestos de aplicaciones
k8s/namespaces.yaml
k8s/traefik/traefik-values.yaml
k8s/argocd/argocd-ingressroute.yaml
k8s/semana4-app/deployment.yaml
k8s/semana4-app/service.yaml
k8s/semana4-app/ingressroute.yaml

## Evidencias
![Aplicación con DNS local](./docs/Aplicacion%20con%20dominio.png)
![ArgoCD con dominio local](./docs/ArgoCD%20con%20dominio.png)