# TrackIT - User Stories

## Project Overview

**Project Name:** TrackIT
**Description:** Centralized stats tracker for your daily habits
**Version:** MVP

---

## User Personas

| Persona | Description |
|---------|-------------|
| **User** | A hobbyist who wants to view and track their habits on a daily basis |

---

## Platform Epics

| Epic ID | Epic Name | Description |
|---------|-----------|-------------|
| E1 | Authentication | User identity management (login, logout) |
| E2 | Configuration | The initial process of setting up TrackIT main configuration based on user criteria (OAuth Linking) |
| E3 | Navigation | Set of actions that allows the user to navigate through the application |
| E4 | Customization | Set of actions that allow the user to have an unique (own) experience |


## Module Epics


---

## User Stories (Platform)

### Epic 1: Authentication (E1)

#### US-1.1: Register

**As a** User
**I want to** Register
**So that** I can access TrackIT features and link my services

**Acceptance Criteria:**
- [ ] AC1: User must provide email, username, and password
- [ ] AC2: User can't register if there's another user with the same username or email
- [ ] AC3: Email must be valid format (user@domain.com)
- [ ] AC4: Password must be at least 8 characters with 1 number and 1 special character
- [ ] AC5: Username must be 3-20 characters, alphanumeric only
- [ ] AC6: System shows inline validation errors for invalid fields
- [ ] AC7: User cannot submit form until all validations pass
- [ ] AC8: User receives confirmation email after successful registration
- [ ] AC9: Once register is completed, when querying for this specific user I get his ID correctly

**Priority:** High
**Status:** To Do

----

#### US-1.2: Log in

**As a** User
**I want to** Log into TrackIT
**So that** I can access my account

**Acceptance Criteria:**
- [ ] AC1: User must provide email or username, and password
- [ ] AC2: System validates credentials against stored data
- [ ] AC3: Email must be valid format (user@domain.com)
- [ ] AC4: System shows inline validation errors for non matching fields (user does not exist, password incorrect)
- [ ] AC5: User gets into his/her own TrackIT dashboard in a correct login attempt
- [ ] AC6: Failed attempts are rate-limited (e.g., 5 attempts before cooldown)

**Priority:** High
**Status:** To Do

-----

#### US-1.3: Log in with OAuth

**As a** User
**I want to** Log into TrackIT with another service account
**So that** I can acess TrackIT features and link my services

**Acceptance Criteria:**
- [ ] AC1: User must select one of the providers to log in

**Priority:** High
**Status:** To Do

---

#### US-1.4: Forgot password

**As a** User
**I want to** Get my forgotten credentials updated 
**So that** I can acess TrackIT features back

**Acceptance Criteria:**
- [ ] AC1: User must select the Forgotten Password? hyperlink
- [ ] AC2: When Forgotten Password? ref is selected a new window pops up where user prompts the email of the forgotten account
- [ ] AC3: User must confirm the email introduced is correct to begin the process of password recovery
- [ ] AC4: After confirmed, user is prompted that whether email/username exists he will be receiving an email with instructions to update his password

**Priority:** Medium-High
**Status:** To Do

---

#### US-1.5: Stay logged in

**As a** User
**I want to** remain authenticated between sessions
**So that** I don't have to log in every time

**Acceptance Criteria:**
- [ ] AC1: User session persists after closing and reopening the app
- [ ] AC2: Auth tokens are stored securely (Keychain/Keystore, not plain storage)
- [ ] AC3: Session expires after 30 days of inactivity
- [ ] AC4: Expired tokens are automatically refreshed if refresh token is valid
- [ ] AC5: User is redirected to login if session cannot be restored
- [ ] AC6: "Remember me" option extends session duration (optional)

**Priority:** High
**Status:** To Do

---

#### US-1.6: Log out

**As a** User
**I want to** sign out of my account
**So that** I can switch accounts, create a new one, or just exit the app

**Acceptance Criteria:**
- [ ] AC1: After pressing the log out button user is redirected to log in with its session terminated

**Priority:** High
**Status:** To Do

---


## TODO 

### Epic 2: Top Content (E2)

#### US-2.1: View top artists

**As a** Listener
**I want to** see my top artists
**So that** I can understand my artist preferences

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** High
**Status:** To Do

---

#### US-2.2: View top tracks

**As a** Listener
**I want to** see my top tracks
**So that** I can know which songs I listen to most

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** High
**Status:** To Do

---

#### US-2.3: Filter by time range

**As a** Listener
**I want to** filter my top content by time period
**So that** I can see how my taste changes over time

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** Medium
**Status:** To Do

---

### Epic 3: Listening Statistics (E3)

#### US-3.1: View listening summary

**As a** Listener
**I want to** see a summary of my listening statistics
**So that** I can understand my overall listening habits

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** High
**Status:** To Do

---

#### US-3.2: View genre breakdown

**As a** Listener
**I want to** see a breakdown of genres I listen to
**So that** I can understand my genre preferences

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** Medium
**Status:** To Do

---

## User Stories (Music Module)

### Epic 1: Authentication (E1)

#### US-1.1: Connect with Spotify

**As a** Listener
**I want to** connect my Spotify account
**So that** I can access my listening data

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** High
**Status:** To Do

---

#### US-1.2: Stay logged in

**As a** Listener
**I want to** remain authenticated between sessions
**So that** I don't have to log in every time

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** High
**Status:** To Do

---

#### US-1.3: Log out

**As a** Listener
**I want to** disconnect my Spotify account
**So that** I can stop sharing my data or switch accounts

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** Medium
**Status:** To Do

---

### Epic 2: Top Content (E2)

#### US-2.1: View top artists

**As a** Listener
**I want to** see my top artists
**So that** I can understand my artist preferences

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** High
**Status:** To Do

---

#### US-2.2: View top tracks

**As a** Listener
**I want to** see my top tracks
**So that** I can know which songs I listen to most

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** High
**Status:** To Do

---

#### US-2.3: Filter by time range

**As a** Listener
**I want to** filter my top content by time period
**So that** I can see how my taste changes over time

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** Medium
**Status:** To Do

---

### Epic 3: Listening Statistics (E3)

#### US-3.1: View listening summary

**As a** Listener
**I want to** see a summary of my listening statistics
**So that** I can understand my overall listening habits

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** High
**Status:** To Do

---

#### US-3.2: View genre breakdown

**As a** Listener
**I want to** see a breakdown of genres I listen to
**So that** I can understand my genre preferences

**Acceptance Criteria:**
- [ ] <!-- AC1: criteria here -->
- [ ] <!-- AC2: criteria here -->

**Priority:** Medium
**Status:** To Do

---

## Story Template

<!--
Copy this template for new user stories:

#### US-X.X: Title

**As a** [persona]
**I want to** [action]
**So that** [benefit]

**Acceptance Criteria:**
- [ ] AC1:
- [ ] AC2:
- [ ] AC3:

**Priority:** [High/Medium/Low]
**Status:** [To Do/In Progress/Done]
**Sprint:** [Sprint number]
**Assigned:** [Team member]
**Notes:**

---
-->

## Status Legend

| Status | Description |
|--------|-------------|
| To Do | Not started |
| In Progress | Currently being worked on |
| Done | Completed and verified |

## Priority Legend

| Priority | Description |
|----------|-------------|
| High | Must have for MVP |
| Medium | Should have for MVP |
| Low | Nice to have, can defer |
