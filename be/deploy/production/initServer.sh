helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install  prometheus bitnami/kube-prometheus --set server.service.type=NodePort
kubectl port-forward --namespace default svc/prometheus-kube-prometheus-prometheus 9090:9090
