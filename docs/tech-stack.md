tech stack

high level

- TypeScript
- Express (Express.js)
- REST API
- MongoDB (MongoDB)
- Cloudinary (Cloudinary)

low level libraries

- Mongoose — mongodb odm
- Zod — request validation
- Multer — multipart/form-data handling (memory storage)
- dotenv — environment config

core features

- CRUD operations for deliveries
- search + filtering
- pagination
- image upload & replacement

api endpoints

- POST /deliveries
  - create delivery
  - supports image upload
- GET /deliveries
  - query params:
    - search (customerName | trackingNumber | courierName)
    - status (in-transit | pending | completed | returned)
    - fromDate, toDate
    - page (default: 1)
    - limit (default: 10, max: 100)
- GET /deliveries/:id
  - get single delivery
- PUT /deliveries/:id
  - update delivery
  - replace image if new file provided
- DELETE /deliveries/:id
  - delete delivery

response format

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

pagination response

```json
{
  "data": [],
  "page": 1,
  "total": 0,
  "totalPages": 0
}
```

model 

```
type DeliveryStatus = 'in-transit' | 'pending' | 'completed' | 'returned';

interface Delivery {
  id: string;
  photoUrl?: string | null;
  customerName: string;
  cost: number;
  materialName: string;
  siteName: string;
  trackingNumber: string;
  courierName: string;
  dispatchDate: string; // ISO string
  status: DeliveryStatus;
}
````