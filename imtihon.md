# JobBoardAPI: Ish e'lonlari boshqarish uchun

**JobBoardAPI** bu ish e'lonlarini boshqarish uchun mo'ljallangan API bo'lib, ish e'lonlari, kompaniyalar, foydalanuvchilar, arizalar va sharhlarni boshqarish imkoniyatini beradi. Advanced level talablarga muvofiq, rolga asoslangan autentifikatsiya va ruxsatnomalar, JWT asosida autentifikatsiya, va boshqa funksiyalarni o'z ichiga oladi.

### 1. Ma'lumotlar Modellari

### Ish E'lonlari Modeli (`JobListing`)

- **id** (UUID) - Ish e'lonlari identifikatori.
- **title** (string) - Ish nomi.
- **description** (text) - Ish ta'rifi.
- **companyId** (UUID) - Kompaniya identifikatori.
- **location** (string) - Ish joylashuvi.
- **salaryRange** (json) - Maosh diapazoni (min va max qiymat).
- **employmentType** (enum) - Ish turi (`full_time`, `part_time`, `contract`, `temporary`, `internship`).
- **requirements** (jsonb) - Talablar (o'quv dasturlari, ko'nikmalar va h.k.).
- **status** (enum) - E'lon holati (`open`, `closed`).
- **postedBy** (UUID) - Ish e'lonini joylashtirgan foydalanuvchi identifikatori.
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### Kompaniya Modeli (`Company`)

- **id** (UUID) - Kompaniya identifikatori.
- **name** (string) - Kompaniya nomi.
- **description** (text) - Kompaniya ta'rifi.
- **website** (string) - Kompaniya veb-sayti.
- **location** (string) - Kompaniya joylashuvi.
- **industry** (string) - Kompaniya sohasi.
- **size** (integer) - Kompaniya xodimlar soni.
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### Foydalanuvchi Modeli (`User`)

- **id** (UUID) - Foydalanuvchi identifikatori.
- **email** (string) - Email manzili, unikal.
- **username** (string) - Foydalanuvchi nomi, unikal.
- **password** (string) - Shaxtalangan parol.
- **role** (enum) - Roli (`job_seeker`, `recruiter`, `admin`).
- **status** (enum) - Hisob holati (`active`, `inactive`).
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### Ariza Modeli (`Application`)

- **id** (UUID) - Ariza identifikatori.
- **jobId** (UUID) - Ish identifikatori.
- **userId** (UUID) - Foydalanuvchi identifikatori.
- **resumeUrl** (string) - Rezyume URL manzili.
- **coverLetter** (text) - Qisqa xat.
- **status** (enum) - Ariza holati (`submitted`, `reviewed`, `interviewing`, `hired`, `rejected`).
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### Sharh Modeli (`Review`)

- **id** (UUID) - Sharh identifikatori.
- **companyId** (UUID) - Kompaniya identifikatori.
- **userId** (UUID) - Foydalanuvchi identifikatori.
- **rating** (integer) - Baholash darajasi (1 dan 5 gacha).
- **comment** (text) - Sharh matni.
- **status** (enum) - Sharh holati (`approved`, `pending`, `rejected`).
- **createdAt** (timestamp) - Yaratilgan sana.
- **updatedAt** (timestamp) - Yangilangan sana.

### 2. API End-pointlar

### 2.1. Auth API-lar

**2.1.1. Foydalanuvchi Ro'yxatdan O'tish (Sign Up)**

- **Endpoint**: `/auth/signup`
- **Method**: `POST`
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "email": "string",
      "username": "string",
      "password": "string",
      "confirmPassword": "string",
      "role": "string", // Enum: ["job_seeker", "recruiter", "admin"]
      "firstName": "string",
      "lastName": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "User created",
      "userId": "UUID",
      "otpSent": true
    }
    
    ```
    

**2.1.2. OTP ni Tasdiqlash (Verify OTP)**

- **Endpoint**: `/auth/verify-otp`
- **Method**: `POST`
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "userId": "UUID",
      "otp": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "OTP verified, account activated"
    }
    
    ```
    

**2.1.3. Foydalanuvchi Tizimga Kirish (Sign In)**

- **Endpoint**: `/auth/signin`
- **Method**: `POST`
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "email": "string",
      "password": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "accessToken": "string",
      "refreshToken": "string"
    }
    
    ```
    

**2.1.4. Foydalanuvchi Ma'lumotlarini Olish (Get Current User)**

- **Endpoint**: `/auth/me`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "email": "string",
      "username": "string",
      "role": "string",
      "firstName": "string",
      "lastName": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.1.5. Foydalanuvchi Tizimdan Chiqish (Logout)**

- **Endpoint**: `/auth/logout`
- **Method**: `GET`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Logout successful"
    }
    
    ```
    

**2.1.6. Token Yangilash (Refresh Token)**

- **Endpoint**: `/auth/refresh-token`
- **Method**: `POST`
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "refreshToken": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "accessToken": "string",
      "refreshToken": "string"
    }
    
    ```
    

### 2.2. Ish E'lonlari API-lari

**2.2.1. Yangi Ish E'loni Qo'shish (Create Job Listing)**

- **Endpoint**: `/jobs`
- **Method**: `POST`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "title": "string",
      "description": "string",
      "companyId": "UUID",
      "location": "string",
      "salaryRange": {
        "min": "decimal",
        "max": "decimal"
      },
      "employmentType": "string", // Enum: ["full_time", "part_time", "contract", "temporary", "internship"]
      "requirements": {
        "education": "string",
        "skills": ["string"]
        // ...other key-value pairs
      },
      "status": "string", // Enum: ["open", "closed"]
      "postedBy": "UUID"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "jobId": "UUID",
      "message": "Job listing created"
    }
    
    ```
    

**2.2.2. Barcha Ish E'lonlarini Olish (Get All Job Listings)**

- **Endpoint**: `/jobs`
- **Method**: `GET`
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    [
      {
        "id": "UUID",
        "title":
    
    ```
    

"string",
"description": "string",
"companyId": "UUID",
"location": "string",
"salaryRange": {
"min": "decimal",
"max": "decimal"
},
"employmentType": "string",
"requirements": {
"education": "string",
"skills": ["string"]
// ...other key-value pairs
},
"status": "string",
"postedBy": "UUID",
"createdAt": "timestamp",
"updatedAt": "timestamp"
},
...
]
```

**2.2.3. ID bo'yicha Ish E'lonini Olish (Get Job Listing by ID)**

- **Endpoint**: `/jobs/:id`
- **Method**: `GET`
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "title": "string",
      "description": "string",
      "companyId": "UUID",
      "location": "string",
      "salaryRange": {
        "min": "decimal",
        "max": "decimal"
      },
      "employmentType": "string",
      "requirements": {
        "education": "string",
        "skills": ["string"]
        // ...other key-value pairs
      },
      "status": "string",
      "postedBy": "UUID",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.2.4. Ish E'lonini Yangilash (Update Job Listing)**

- **Endpoint**: `/jobs/:id`
- **Method**: `PUT`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "title": "string",
      "description": "string",
      "companyId": "UUID",
      "location": "string",
      "salaryRange": {
        "min": "decimal",
        "max": "decimal"
      },
      "employmentType": "string",
      "requirements": {
        "education": "string",
        "skills": ["string"]
        // ...other key-value pairs
      },
      "status": "string",
      "postedBy": "UUID"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "jobId": "UUID",
      "message": "Job listing updated"
    }
    
    ```
    

**2.2.5. Ish E'lonini O'chirish (Delete Job Listing)**

- **Endpoint**: `/jobs/:id`
- **Method**: `DELETE`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Job listing deleted"
    }
    
    ```
    

### 2.3. Kompaniyalar API-lari

**2.3.1. Yangi Kompaniya Qo'shish (Create Company)**

- **Endpoint**: `/companies`
- **Method**: `POST`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "name": "string",
      "description": "string",
      "website": "string",
      "location": "string",
      "industry": "string",
      "size": "integer"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "companyId": "UUID",
      "message": "Company created"
    }
    
    ```
    

**2.3.2. Barcha Kompaniyalarni Olish (Get All Companies)**

- **Endpoint**: `/companies`
- **Method**: `GET`
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    [
      {
        "id": "UUID",
        "name": "string",
        "description": "string",
        "website": "string",
        "location": "string",
        "industry": "string",
        "size": "integer",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    
    ```
    

**2.3.3. ID bo'yicha Kompaniya Olish (Get Company by ID)**

- **Endpoint**: `/companies/:id`
- **Method**: `GET`
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "name": "string",
      "description": "string",
      "website": "string",
      "location": "string",
      "industry": "string",
      "size": "integer",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.3.4. Kompaniyani Yangilash (Update Company)**

- **Endpoint**: `/companies/:id`
- **Method**: `PUT`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "name": "string",
      "description": "string",
      "website": "string",
      "location": "string",
      "industry": "string",
      "size": "integer"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "companyId": "UUID",
      "message": "Company updated"
    }
    
    ```
    

**2.3.5. Kompaniyani O'chirish (Delete Company)**

- **Endpoint**: `/companies/:id`
- **Method**: `DELETE`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Company deleted"
    }
    
    ```
    

### 2.4. Arizalar API-lari

**2.4.1. Yangi Ariza Qo'shish (Create Application)**

- **Endpoint**: `/applications`
- **Method**: `POST`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "jobId": "UUID",
      "resumeUrl": "string",
      "coverLetter": "string"
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "applicationId": "UUID",
      "message": "Application created"
    }
    
    ```
    

**2.4.2. Barcha Arizalarni Olish (Get All Applications)**

- **Endpoint**: `/applications`
- **Method**: `GET`
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    [
      {
        "id": "UUID",
        "jobId": "UUID",
        "userId": "UUID",
        "resumeUrl": "string",
        "coverLetter": "string",
        "status": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    
    ```
    

**2.4.3. ID bo'yicha Ariza Olish (Get Application by ID)**

- **Endpoint**: `/applications/:id`
- **Method**: `GET`
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "jobId": "UUID",
      "userId": "UUID",
      "resumeUrl": "string",
      "coverLetter": "string",
      "status": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.4.4. Arizani Yangilash (Update Application)**

- **Endpoint**: `/applications/:id`
- **Method**: `PUT`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "resumeUrl": "string",
      "coverLetter": "string",
      "status": "string" // Enum: ["submitted", "reviewed", "interviewing", "hired", "rejected"]
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "applicationId": "UUID",
      "message": "Application updated"
    }
    
    ```
    

**2.4.5. Arizani O'chirish (Delete Application)**

- **Endpoint**: `/applications/:id`
- **Method**: `DELETE`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Application deleted"
    }
    
    ```
    

### 2.5. Sharhlar API-lari

**2.5.1. Yangi Sharh Qo'shish (Create Review)**

- **Endpoint**: `/reviews`
- **Method**: `POST`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "companyId": "UUID",
      "rating": "
    
    ```
    

integer", // 1 to 5
"comment": "string"
}
```

- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "reviewId": "UUID",
      "message": "Review created"
    }
    
    ```
    

**2.5.2. Barcha Sharhlarni Olish (Get All Reviews)**

- **Endpoint**: `/reviews`
- **Method**: `GET`
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    [
      {
        "id": "UUID",
        "companyId": "UUID",
        "userId": "UUID",
        "rating": "integer",
        "comment": "string",
        "status": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    
    ```
    

**2.5.3. ID bo'yicha Sharh Olish (Get Review by ID)**

- **Endpoint**: `/reviews/:id`
- **Method**: `GET`
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "id": "UUID",
      "companyId": "UUID",
      "userId": "UUID",
      "rating": "integer",
      "comment": "string",
      "status": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    
    ```
    

**2.5.4. Sharhni Yangilash (Update Review)**

- **Endpoint**: `/reviews/:id`
- **Method**: `PUT`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Kiruvchi ma'lumotlar**:
    
    ```json
    {
      "rating": "integer",
      "comment": "string",
      "status": "string" // Enum: ["approved", "pending", "rejected"]
    }
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "reviewId": "UUID",
      "message": "Review updated"
    }
    
    ```
    

**2.5.5. Sharhni O'chirish (Delete Review)**

- **Endpoint**: `/reviews/:id`
- **Method**: `DELETE`
- **Header**:
    
    ```
    Authorization: Bearer {token}
    
    ```
    
- **Qaytariladigan ma'lumotlar**:
    
    ```json
    {
      "message": "Review deleted"
    }
    
    ```
    

### 3. Autentifikatsiya va Ruxsatnomalar

### 3.1. JWT Autentifikatsiya

- **Access Token**: Foydalanuvchini autentifikatsiya qilish uchun ishlatiladi.
- **Refresh Token**: Access token muddati tugaganda yangilash uchun ishlatiladi.

### 3.2. Role-based Authorization

- **Roles**:
    - `job_seeker`: O'z arizalari va sharhlarini boshqarish.
    - `recruiter`: Ish e'lonlari va kompaniyalar bo'yicha operatsiyalarni boshqarish.
    - `admin`: Barcha foydalanuvchilar, ish e'lonlari, kompaniyalar, arizalar va sharhlarni boshqarish.

### 3.3. Permission Guards

- Endpointlar uchun `Authorization` sarlavhasi kerak.
- Rolga qarab himoyalangan:
    - `admin`: Barcha foydalanuvchilar, ish e'lonlari, kompaniyalar, arizalar va sharhlarni boshqarish.
    - `recruiter`: Ish e'lonlari va kompaniyalar bo'yicha operatsiyalarni bajarish.

**Guard Misoli**:

```json
{
  "role": "admin",
  "message": "Access denied. Admins only."
}

```

### 4. Texnologiyalar

- **Express.js**: API yaratish uchun.
- **Knex.js**: Ma'lumotlar bazasi bilan ishlash uchun.
- **PostgreSQL**: Ma'lumotlarni saqlash uchun.
- **JWT**: Foydalanuvchi autentifikatsiyasi uchun.
- **Express-Winston**: Loglarni saqlash va ularga kirish uchun.

### 5. Test va Loyihani Versiya Boshqaruvi

- **Postman**: API'ni sinab ko'rish uchun.
- **GitHub**: Versiyalarni boshqarish uchun.

### Xulosa

**JobBoardAPI** yuqori darajadagi ish e'lonlari boshqaruvi uchun kerakli barcha funksiyalarni taqdim etadi. Ish e'lonlari, kompaniyalar, foydalanuvchilar, arizalar va sharhlarni boshqarish uchun CRUD operatsiyalari, JWT asosida autentifikatsiya, va rolga asoslangan ruxsatnomalar o'z ichiga oladi. Bu API'lar orqali ish e'lonlari va ariza boshqaruvi samarali boshqariladi va himoyalanadi.