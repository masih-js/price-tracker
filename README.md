# Blockchain Price Tracker

This project tracks cryptocurrency prices (Ethereum and Polygon), sets price alerts, and provides cryptocurrency price-related APIs. It is Dockerized and can be easily run with a single command.

---

## **Technologies Used**

### **Backend Framework**
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

### **Database**
- **PostgreSQL**: A relational database system used for storing cryptocurrency prices, alerts, and logs.

### **Services**
1. **Moralis API**: Used for fetching real-time cryptocurrency prices.
2. **Mailersend**: For sending email alerts when conditions are met.

### **Swagger**
- Swagger is integrated for API documentation, accessible at:  
  `http://localhost:8001/api`.

---

## **APIs**

### **1. Fetch Hourly Prices**
- **Endpoint**: `GET /price/hourly/:chain`
- **Description**: Returns the prices of a cryptocurrency (Ethereum/Polygon) for each hour within the last 24 hours.
- **Parameters**:
  - `chain`: The cryptocurrency chain (e.g., `ethereum`).

### **2. Set Price Alert**
- **Endpoint**: `POST /alerts`
- **Description**: Sets an alert for a specific price.
- **Request Body**:
  ```json
  {
    "chain": "ethereum",
    "targetPrice": 1500,
    "email": "user@example.com"
  }
  ```

---

## **Usage**

You can run this project by cloning the repository or pulling the pre-built Docker image:

### **Clone the Project**
Clone the repository from GitHub:
```bash
git clone git@github.com:masih-js/price-tracker.git
cd price-tracker
```

### **Pull the Docker Image**
Alternatively, pull the pre-built Docker image:
```bash
docker pull masihjs/price-tracker-app:latest
```
