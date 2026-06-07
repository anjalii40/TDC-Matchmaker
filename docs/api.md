# MATCHMAKER-CRM API Specifications

All requests proxy automatically from `/api/*` to `http://localhost:5050/api/*`.

## Endpoints

### 1. Customers API

#### `GET /api/customers`
- **Description**: Returns all clients with dynamic `statusTag` computed on the fly.
- **Response**: Array of `Customer` objects.

#### `GET /api/customers/:id`
- **Description**: Returns a single client profile.
- **Response**: `Customer` object.

#### `PUT /api/customers/:id`
- **Description**: Modifies customer details, triggers note additions, proposes matches, or toggles pause/closed states.
- **Payload Schema**:
  - `note`: string (appends coordinator note)
  - `action`: `'propose'` | `'update_proposal'` | `'toggle_paused'` | `'toggle_closed'`
  - `match`: `{ profileId, firstName, lastName, designation, city, score, intro }` (required for `'propose'`)
  - `profileId` & `status`: string (required for `'update_proposal'`)

---

### 2. Matching API

#### `GET /api/customers/:id/matches`
- **Description**: Suggests top 5 candidates, updates the client to `Active` stage, and runs AI introduction description.
- **Response**: `{ customer, matches: [ ... ] }`
