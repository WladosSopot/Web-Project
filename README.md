# Opis endpointów API

## 🔐 Autoryzacja

Aplikacja wykorzystuje **JWT (Bearer Token)** do uwierzytelniania użytkownika.  
Dostęp do chronionych endpointów jest zabezpieczony przy użyciu:

- Nagłówka: `Authorization: Bearer <token>`
- Guard w NestJS: `@UseGuards(AuthGuard)`

Token jest zwracany po poprawnym zalogowaniu i musi być dołączany do każdego chronionego zapytania.

### 💾 Przechowywanie tokena na froncie

Token JWT po zalogowaniu jest przechowywany na froncie w **localStorage** lub **sessionStorage**:

```ts
// zapis tokena
localStorage.setItem('jwt', userData.data.access_token);

// pobranie tokena przy każdym żądaniu
const token = localStorage.getItem('jwt');
```

✅ Zalecenia bezpieczeństwa:
- Nigdy nie przechowuj w nim wrażliwych danych (np. hasła)
- Stosuj **HTTPS**, aby chronić token w transmisji
- W razie potrzeby można używać **HttpOnly cookies** dla większego bezpieczeństwa

---

## 📌 Endpointy

### POST /auth/register

Endpoint odpowiedzialny za rejestrację nowego użytkownika.  
Przyjmuje dane rejestracyjne (np. e-mail oraz hasło), waliduje je i tworzy nowe konto w bazie danych.

---

### POST /auth/login

Endpoint odpowiedzialny za uwierzytelnianie użytkownika.  
Weryfikuje poprawność danych logowania i zwraca token autoryzacyjny (JWT), umożliwiający dostęp do chronionych zasobów systemu.

---

### GET /history

Endpoint służący do pobierania historii wygenerowanych konspektów zalogowanego użytkownika.

🔒 Wymaga autoryzacji (Bearer Token + UseGuards).

Zwraca listę zapisanych wpisów wraz z:
- tematem,
- treścią,
- datą utworzenia.

---

### DELETE /history/{id}

Endpoint umożliwiający usunięcie wybranego wpisu z historii na podstawie jego identyfikatora.

🔒 Wymaga autoryzacji (Bearer Token + UseGuards).

---

### POST /ai/request

Endpoint odpowiedzialny za wysłanie zapytania do API Gemini w celu wygenerowania konspektu na podstawie podanego tematu.

🔒 Wymaga autoryzacji (Bearer Token + UseGuards).

Zwraca:
- wygenerowaną treść,
- zapisuje ją w historii użytkownika.

---

# 🚀 Instrukcja uruchomienia projektu

## 📦 Backend (NestJS + Yarn)

### 1. Przejdź do katalogu backend
```bash
cd beck-end
```

### 2. Zainstaluj zależności
```bash
yarn install
```

### 3. Uruchom serwer w trybie developerskim
```bash
yarn start:dev
```

Backend domyślnie działa pod adresem:
```
http://localhost:3000
```

---

## 💻 Frontend (React + Vite + npm)

### 1. Przejdź do katalogu frontend
```bash
cd Front-end
```

### 2. Zainstaluj zależności
```bash
npm install
```

### 3. Uruchom aplikację
```bash
npm run dev
```

Frontend domyślnie działa pod adresem:
```
http://localhost:5173
```

---

# 🔐 Mechanizm zabezpieczeń w NestJS

Chronione endpointy wykorzystują:

```ts
@UseGuards(AuthGuard)
```

Nagłówek żądania musi zawierać:

```
Authorization: Bearer <JWT_TOKEN>
```

W przypadku braku tokena lub niepoprawnego tokena serwer zwraca:

```
401 Unauthorized
```
