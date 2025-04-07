# 📦 NestJS Serverless Lambda API

This is a **NestJS REST API** deployed on **AWS Lambda** using the **Serverless Framework**, featuring:

- ✅ AWS Lambda + API Gateway
- ✅ Swagger documentation
- ✅ DynamoDB integration
- ✅ RESTful endpoints for `/combinate`, `/save`, and `/history`

---

## 🌐 Swagger Documentation

Access the full interactive API documentation:

🔗 [Swagger UI](https://4pgq95yfyh.execute-api.us-east-2.amazonaws.com/dev/reto/docs)

---

## 📡 Deployed API Base URL

### Combinate Endpoint

Use the following `curl` command to call the `/combinate` endpoint:

```bash
curl --location 'https://4pgq95yfyh.execute-api.us-east-2.amazonaws.com/dev/reto/combinate/1/1' \
--header 'Content-Type: application/json'
```

### Save Endpoint

Use the following `curl` command to call the `/save` endpoint:

```bash
curl --location 'https://4pgq95yfyh.execute-api.us-east-2.amazonaws.com/dev/reto/save' \
--header 'Content-Type: application/json' \
--data '{
 "comicId": "combinate-5-5",
 "name" : "metadat22224444a",
 "description" : "este es un producto22224444"
}'
```
### History Endpoint

Use the following `curl` command to call the `/history` endpoint:

```bash
curl --location 'https://4pgq95yfyh.execute-api.us-east-2.amazonaws.com/dev/reto/history?page=1' \
--header 'Content-Type: application/json'
```