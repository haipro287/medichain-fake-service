minikube delete
minikube start --cpus=10
source .env
minikube addons enable registry
minikube addons enable ingress
PROJECT_NAME=medicalchain-fakeservice-test
export $(grep -v '^#' .env | xargs) && envsubst < deploy/production/be-chart/values.tmp.yaml > be.values.yaml
helm delete backend --namespace=${PROJECT_NAME}
helm install backend -f be.values.yaml --namespace=${PROJECT_NAME} deploy/production/be-chart/
helm template backend -f be.values.yaml --namespace=${PROJECT_NAME} deploy/production/be-chart/
kubectl --namespace=${PROJECT_NAME} exec --stdin --tty pod/backend-deployment-6db77c7885-cxz8b -- /bin/sh

kubectl -n=${PROJECT_NAME} describe pod backend
kubectl  -n=${PROJECT_NAME} get pvc,pv
kubectl  -n=${PROJECT_NAME} get pods,statefulsets,services,ingresses
kubectl -n=${PROJECT_NAME} logs -l app=backend-selector -f
wget http://backend-service/series-query?guest=true
