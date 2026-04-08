### 1. project setup

- init project
  - `npm init`
  - install TypeScript + ts-node + types
- install core deps:
  - Express.js
  - Mongoose
  - Zod
  - multer, dotenv, cloudinary sdk
- setup folder structure:

```
src/
  config/
  middleware/
  utils/
  app.ts
  server.ts
```

---

### 2. environment + config

- setup dotenv
- create env validator (zod)
- configure:
  - mongodb connection
  - cloudinary client

---

### 3. base express setup

- init app
- middlewares:
  - json parser
  - multer (memory storage)
  - error handler (global)

---

### 4. database layer

- define mongoose schema
  - match your `Delivery` type
  - add:
    - timestamps
    - indexes:
      - trackingNumber (unique)
      - dispatchDate
      - status
- create model

---

### 5. validation layer (zod)

- create schemas:
  - createDeliverySchema
  - updateDeliverySchema
  - querySchema
- validate:
  - req.body
  - req.query

---

### 6. delivery module (core logic)

split into:

- controller
- service
- repository (optional but clean)

flow:

```
route → controller → service → db
```

---

### 7. implement endpoints

### POST /deliveries

- validate body
- upload image → Cloudinary
- save delivery

---

### GET /deliveries

- parse query:
  - search → regex or text index
  - status filter
  - date range filter
- apply pagination:
  - skip + limit
- return paginated response

---

### GET /deliveries/:id

- find by id
- return or 404

---

### PUT /deliveries/:id

- validate body
- if image present:
  - upload new
  - delete old (if exists)
- update document

---

### DELETE /deliveries/:id

- optionally delete image from cloudinary
- delete document

---

### 8. image handling utility

- create helper:
  - uploadImage(file)
  - deleteImage(publicId)
- handle:
  - failure → throw error
  - success → return `{ url, publicId }`

---

### 9. search + filter logic

build dynamic query:

```tsx
const query: any = {};

if (search) {
  query.$or = [
    { customerName: /search/i },
    { trackingNumber: /search/i },
    { courierName: /search/i }
  ];
}

if (status) query.status = status;

if (fromDate || toDate) {
  query.dispatchDate = {
    ...(fromDate && { $gte: new Date(fromDate) }),
    ...(toDate && { $lte: new Date(toDate) }),
  };
}
```

---

### 10. pagination utility

- standard helper:

```tsx
const page = Number(req.query.page) || 1;
const limit = Math.min(Number(req.query.limit) || 10, 100);
const skip = (page - 1) * limit;
```

---

### 11. error handling

- create:
    - custom error class
    - global error middleware
- standard response:

```json
{
  "success": false,
  "error": "message"
}
```

---

### 12. security basics

- helmet
- rate limit
- basic input sanitization

---

### 13. testing (basic)

- test:
  - create delivery
  - image upload
  - filters + pagination
  - update with image replace

---

### 14. optional improvements (later)

- text index search (better than regex)
- auth (JWT)
- soft delete
- logging (pino)

---

### final flow summary

```
request
 → validation (zod)
 → controller
 → service (image + logic)
 → mongoose
 → response
```

---

if you want next step, I can generate:

- exact folder structure with files
- or full starter boilerplate in TypeScript