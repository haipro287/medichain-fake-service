PROJECT_NAME=medicalchain-fakeservice-test
kubectl create ns ${PROJECT_NAME} --dry-run=client -o yaml | kubectl apply -f -
kubectl delete ns ${PROJECT_NAME}

export $(grep -v '^#' .env.production | xargs) && envsubst < deploy/production/nginx-chart/values.tmp.yaml > nginx.values.yaml
helm delete nginx --namespace=${PROJECT_NAME}
helm install nginx -f nginx.values.yaml --namespace=${PROJECT_NAME} deploy/production/nginx-chart/
helm template nginx -f nginx.values.yaml --namespace=${PROJECT_NAME} deploy/production/nginx-chart/
kubectl -n=${PROJECT_NAME} logs -l app=nginx-selector --all-containers=true -f
kubectl -n=${PROJECT_NAME} describe pod nginx

export $(grep -v '^#' .env.production | xargs) && envsubst < deploy/production/sish-client-chart/values.tmp.yaml > sish-client.values.yaml
helm delete sish-client --namespace=${PROJECT_NAME}
helm install sish-client -f sish-client.values.yaml --namespace=${PROJECT_NAME} deploy/production/sish-client-chart/
helm template sish-client -f sish-client.values.yaml --namespace=${PROJECT_NAME} deploy/production/sish-client-chart/
kubectl -n=${PROJECT_NAME} describe pod -l app=ssh-tunnel
kubectl -n=${PROJECT_NAME} logs -l app=ssh-tunnel-selector --all-containers=true -f

kubectl port-forward pod/nginx-deployment-77cdffd6f7-4798n 11122:80 --address 0.0.0.0  --namespace=${PROJECT_NAME}


minikube service nginx-service --url -n ${PROJECT_NAME}
ssh -p 22222 -R t:80:192.168.49.2:30899 dev.nftal.io

kubectl run -it load-generator --image=busybox /bin/sh -n=${PROJECT_NAME}
kubectl attach load-generator -c load-generator -i -t -n=${PROJECT_NAME}

kubectl -n=${PROJECT_NAME} get pod frontend
kubectl -n=${PROJECT_NAME} describe pod/ssh-tunnel-deployment-5fb577d7cd-b98tt
kubectl  -n=${PROJECT_NAME} get pods,statefulsets,services,ingresses
kubectl -n=${PROJECT_NAME} logs pod/web-sish-tunnel-deployment-6bdb5958d8-ch9m2 -f