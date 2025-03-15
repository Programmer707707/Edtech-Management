## **EdTech Course Management API**  
Bu hujjat **EdTech platformasida kurslarni boshqarish uchun RESTful API** yaratish uchun ishlab chiqilgan. API kurslar, talabalar, kurslarga yozilish, va sharhlar kabi funksiyalarni amalga oshiradi.  

**1\. Loyihaning diapazoni**  
Ushbu API quyidagi asosiy funksiyalarni taqdim etadi:

* **Kurslarni boshqarish (CRUD)**: Kurslarni yaratish, tahrirlash, o'chirish va ko'rish.  
* **Talabalar ro'yxati**: Talabalarni ro'yxatga olish va ularni kurslarga yozish.  
* **Kurslarga yozilish tizimi**: Talabalar kurslarga yozilishi va ularning kursdagi holatini kuzatish.  
* **Oddiy analitika**: Ommabop kurslar va o'zlashtirish foizlarini hisoblash.

---

**2\. Texnologiyalar**

* **Node.js** – Backend uchun JavaScript dasturlash tili  
* **Express.js** – Node.js uchun veb framework  
* **MongoDB** – Ma'lumotlar bazasi (NoSQL)  
* **JWT** – Foydalanuvchi autentifikatsiyasi uchun  
* **Swagger** – API hujjatlarini avtomatik ravishda yaratish

---

**3\. Dastur Ishlash Tamoyillari**

1. **Kurslarni boshqarish (CRUD)**: Kurs qo'shish, tahrirlash, o'chirish va ko'rish imkoniyatlari.  
2. **Talabalar ro'yxati**: Talabalarni ro'yxatga olish va ularni kurslarga yozish.  
3. **Kurslarga yozilish tizimi**: Talabalar kurslarga yozilishi va ularning kursdagi holatini kuzatish.  
4. **Sharhlar**: Kurslarga sharhlar qo'shish va har bir kursni o'rtacha reytinigini olish.

---

**4\. API Foydalanish Qo'llanmasi**  
**4.1 Talabalarni Yaratish va Kurslarga Yozilish**  
**Talabalar Ro'yxatiga Qo'shish**

* **Endpoint**: POST /api/students  
* **Ma'lumotlar**:  
  ·   	{  
  ·   	  "name": "Anvar Anvarov",  
  ·   	  "email": "anvar@gmail.com",  
  ·   	  "courses": \[\],  
  ·   	  "enrollDate": "2025-03-14"  
  ·   	}

**Talabaga Kursga Yozilish**

* **Endpoint**: POST /api/students/:studentId/enroll  
* **Ma'lumotlar**:  
  ·   	{  
  ·   	  "courseId": "67d2dd98e13b84034248f449"  
  ·   	}

---

**4.2 Kurslar Boshqaruvi (CRUD)**  
**Kurslar Ro'yxatini Ko'rish**

* **Endpoint**: GET /api/courses  
* **Izoh**: Barcha kurslarni ko'rish.

**Yangi Kurs Qo'shish**

* **Endpoint**: POST /api/courses  
* **Ma'lumotlar**:  
  ·   	{  
  ·   	  "name": "Introduction to Node.js",  
  ·   	  "description": "Learn the basics of Node.js",  
  ·   	  "category": "Backend Development",  
  ·   	  "price": 49.99,  
  ·   	  "instructor": "John Doe"  
  ·   	}

**Kursni Yangilash**

* **Endpoint**: PUT /api/courses/:id  
* **Ma'lumotlar**:  
  ·   	{  
  ·   	  "name": "Updated Course Name",  
  ·   	  "description": "Updated description",  
  ·   	  "price": 59.99  
  ·   	}

**Kursni O'chirish**

* **Endpoint**: DELETE /api/courses/:id

---

**4.3 Kurslar Bo'yicha Sharhlar**  
**Kursga Sharh Qoldirish**

* **Endpoint**: POST /api/reviews  
* **Ma'lumotlar**:  
  ·   	{  
  ·   	  "courseId": "67d2dd98e13b84034248f449",  
  ·   	  "review": "This course is very helpful\!",  
  ·   	  "rating": 5  
  ·   	}

**Kursning Sharhlarini Ko'rish**

* **Endpoint**: GET /api/reviews/:courseId  
* **Izoh**: Kursga qoldirilgan barcha sharhlarni ko'rish.

**Kursning O'rtacha Reytingi**

* **Endpoint**: GET /api/reviews/:courseId/average-rating  
* **Izoh**: Kursning o'rtacha reytingini olish.
