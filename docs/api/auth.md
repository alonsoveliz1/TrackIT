# TrackIT API Contract — Authentication (E1)

## Overview

**Base URL:** `/api/auth`
**Refs:** US-1.1 through US-1.6
**Content-Type:** `application/json`
---

## Common Error Shape

All error responses follow this structure:

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable description",
  "fields": {
    "fieldName": "Field-specific error message"
  }
}
```

- `error` — machine-readable code (always present)
- `message` — human-readable summary (always present)
- `fields` — per-field validation errors (only on `VALIDATION_ERROR`)

---

## Endpoints

### POST `/api/auth/register`

**Ref:** US-1.1

Creates a new user account.

#### Request

```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `email` | string | Required. Valid email format — `user@domain.com` (AC3) |
| `username` | string | Required. 3-20 characters, alphanumeric only (AC5) |
| `password` | string | Required. Min 8 characters, at least 1 number and 1 special character (AC4) |

#### Responses

**`201 Created`** — Registration successful (AC9)

```json
{
  "userId": "uuid",
  "username": "johndoe",
  "email": "john@example.com",
  "message": "Registration successful. Please check your email to verify your account."
}
```

**`400 Bad Request`** — Validation failed (AC3, AC4, AC5, AC6)

```json
{
  "error": "VALIDATION_ERROR",
  "message": "One or more fields are invalid.",
  "fields": {
    "email": "Must be a valid email format",
    "password": "Must be at least 8 characters with 1 number and 1 special character",
    "username": "Must be 3-20 alphanumeric characters"
  }
}
```

**`409 Conflict`** — Duplicate email or username (AC2)

```json
{
  "error": "ALREADY_EXISTS",
  "message": "An account with this email or username already exists.",
  "fields": {
    "email": "An account with this email already exists"
  }
}
```

#### Side Effects

- Sends verification email to the provided address (AC8)
- Password is hashed (bcrypt) before storage

---

### POST `/api/auth/login`

**Ref:** US-1.2

Authenticates a user and returns access + refresh tokens.

#### Request

```json
{
  "identifier": "string",
  "password": "string"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `identifier` | string | Required. Email or username (AC1) |
| `password` | string | Required |

#### Responses

**`200 OK`** — Authenticated (AC5)

```json
{
  "accessToken": "jwt...",
  "refreshToken": "jwt...",
  "expiresIn": 900,
  "user": {
    "userId": "uuid",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**`401 Unauthorized`** — Bad credentials (AC4)

```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "Email/username or password is incorrect."
}
```

**`429 Too Many Requests`** — Rate limited (AC6)

```json
{
  "error": "RATE_LIMITED",
  "message": "Too many login attempts. Try again in 15 minutes.",
  "retryAfter": 900
}
```

#### Notes

- `identifier` accepts either email or username
- Rate limit: 5 failed attempts per account per 15-minute window (AC6)

---

### POST `/api/auth/oauth`

**Ref:** US-1.3

Exchanges an OAuth provider code for TrackIT tokens. The mobile client handles the OAuth consent screen; this endpoint receives the resulting authorization code.

#### Request

```json
{
  "provider": "string",
  "code": "string",
  "redirectUri": "string"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `provider` | string | Required. One of: `google`, `spotify` (AC1) |
| `code` | string | Required. Authorization code from OAuth provider |
| `redirectUri` | string | Required. Must match the redirect URI used in the OAuth consent flow |

#### Responses

**`200 OK`** — Authenticated (existing account linked to this provider)

```json
{
  "accessToken": "jwt...",
  "refreshToken": "jwt...",
  "expiresIn": 900,
  "isNewUser": false,
  "user": {
    "userId": "uuid",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**`201 Created`** — New account created via OAuth

```json
{
  "accessToken": "jwt...",
  "refreshToken": "jwt...",
  "expiresIn": 900,
  "isNewUser": true,
  "user": {
    "userId": "uuid",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**`400 Bad Request`** — Invalid or expired code

```json
{
  "error": "INVALID_CODE",
  "message": "OAuth authorization code is invalid or has expired."
}
```

**`400 Bad Request`** — Unsupported provider

```json
{
  "error": "UNSUPPORTED_PROVIDER",
  "message": "Provider 'x' is not supported."
}
```

#### Notes

- If the provider email matches an existing account, the accounts are linked automatically
- The `isNewUser` flag lets the client decide whether to show onboarding

---

### POST `/api/auth/refresh`

**Ref:** US-1.5

Issues a new access token using a valid refresh token.

#### Request

```json
{
  "refreshToken": "string"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `refreshToken` | string | Required. Previously issued refresh token |

#### Responses

**`200 OK`** — Token refreshed (AC4)

```json
{
  "accessToken": "jwt...",
  "expiresIn": 900
}
```

**`401 Unauthorized`** — Expired or invalid refresh token (AC5)

```json
{
  "error": "INVALID_TOKEN",
  "message": "Session expired. Please log in again."
}
```

#### Notes

- Access token lifetime: 15 minutes
- Refresh token lifetime: 30 days (AC3)
- Refresh tokens are single-use; a new refresh token is issued with each access token rotation
- Expired refresh tokens redirect the client to login (AC5)

---

### POST `/api/auth/forgot-password`

**Ref:** US-1.4

Initiates the password reset flow by sending a reset email.

#### Request

```json
{
  "email": "string"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `email` | string | Required. Email address of the account (AC2) |

#### Responses

**`200 OK`** — Always returns success to prevent user enumeration (AC4)

```json
{
  "message": "If an account exists with this email, you will receive password reset instructions."
}
```

**`400 Bad Request`** — Invalid email format

```json
{
  "error": "VALIDATION_ERROR",
  "message": "One or more fields are invalid.",
  "fields": {
    "email": "Must be a valid email format"
  }
}
```

#### Side Effects

- Sends reset email only if the account exists
- Reset token expires after 1 hour
- Previous unused reset tokens are invalidated

#### Notes

- Always returns `200` regardless of whether the email exists (AC4, security best practice)

---

### POST `/api/auth/reset-password`

**Ref:** US-1.4 (companion endpoint)

Completes the password reset by setting a new password.

#### Request

```json
{
  "token": "string",
  "newPassword": "string"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `token` | string | Required. Reset token from the email link |
| `newPassword` | string | Required. Same rules as registration — min 8 chars, 1 number, 1 special char |

#### Responses

**`200 OK`** — Password updated

```json
{
  "message": "Password updated successfully."
}
```

**`400 Bad Request`** — Invalid or expired token

```json
{
  "error": "INVALID_TOKEN",
  "message": "Reset link is invalid or has expired."
}
```

**`400 Bad Request`** — New password fails validation

```json
{
  "error": "VALIDATION_ERROR",
  "message": "One or more fields are invalid.",
  "fields": {
    "newPassword": "Must be at least 8 characters with 1 number and 1 special character"
  }
}
```

#### Side Effects

- All existing refresh tokens for this user are invalidated (forces re-login on all devices)
- Reset token is consumed and cannot be reused

---

### POST `/api/auth/logout`

**Ref:** US-1.6

Terminates the user session by invalidating the refresh token.

#### Request

**Headers:**
```
Authorization: Bearer <accessToken>
```

```json
{
  "refreshToken": "string"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `refreshToken` | string | Required. The refresh token to invalidate |

#### Responses

**`200 OK`** — Logged out (AC1)

```json
{
  "message": "Logged out successfully."
}
```

**`401 Unauthorized`** — Missing or invalid access token

```json
{
  "error": "UNAUTHORIZED",
  "message": "Access token is missing or invalid."
}
```

#### Side Effects

- Refresh token is invalidated server-side
- Client is responsible for clearing stored tokens locally

---

## Authentication Scheme

All protected endpoints require:

```
Authorization: Bearer <accessToken>
```

| Token | Lifetime | Storage (mobile) |
|-------|----------|-------------------|
| Access Token (JWT) | 15 minutes | In-memory only |
| Refresh Token | 30 days | Secure storage (Keychain/Keystore) (US-1.5 AC2) |

---

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `POST /api/auth/login` | 5 failed attempts per account | 15 minutes |
| `POST /api/auth/forgot-password` | 3 requests per email | 1 hour |
| `POST /api/auth/register` | 10 requests per IP | 1 hour |

---

## Endpoint Summary

| Method | Path | Ref | Auth Required |
|--------|------|-----|---------------|
| POST | `/api/auth/register` | US-1.1 | No |
| POST | `/api/auth/login` | US-1.2 | No |
| POST | `/api/auth/oauth` | US-1.3 | No |
| POST | `/api/auth/refresh` | US-1.5 | No |
| POST | `/api/auth/forgot-password` | US-1.4 | No |
| POST | `/api/auth/reset-password` | US-1.4 | No |
| POST | `/api/auth/logout` | US-1.6 | Yes |
