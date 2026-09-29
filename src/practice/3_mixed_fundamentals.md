# 🚀 Practice 03 — Now We Increase the Difficulty

## Problem 1 — Inventory

Create:

```ts
type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
};
```

Create 5 products.

Write:

```ts
function getInStockProducts(products: Product[]): Product[]
```

Return only products where:

```text
stock > 0
```

Then:

```ts
function getInventoryValue(products: Product[]): number
```

Calculate:

```text
price × stock
```

for **all products**.

Example:

```text
Laptop     ₹1000 × 5 = ₹5000
Mouse      ₹20   × 0 = ₹0
Keyboard   ₹50   × 3 = ₹150
```

---

## Problem 2 — Login System

Create a type representing:

```text
success
failure
```

Success should contain:

```text
userId
username
```

Failure should contain:

```text
message
```

Then:

```ts
function handleLogin(result: LoginResult): string
```

It should produce different messages depending on whether login succeeded or failed.

**Don't use `typeof` blindly.**

Think about how you can design the type so TypeScript can understand the state.

---

## Problem 3 — Search Function

Create:

```ts
function search(
    items: string[],
    query?: string
): string[]
```

Rules:

- If `query` isn't provided → return all items.
- If query exists → return items containing that query.
- Search should be case-insensitive.

Example:

```text
["Apple", "Banana", "Pineapple", "Orange"]
```

Searching:

```text
"apple"
```

should return:

```text
["Apple", "Pineapple"]
```

---

## Problem 4 — Tuple Function

Create:

```ts
type UserRecord = [number, string, boolean];
```

Represent:

```text
id
name
isActive
```

Then create:

```ts
function formatUser(user: UserRecord): string
```

Example:

```ts
[101, "Dev", true]
```

should produce something like:

```text
"101 - Dev - Active"
```

and:

```ts
[102, "Rahul", false]
```

should produce:

```text
"102 - Rahul - Inactive"
```

---

## Problem 5 — 🔥 Mini Backend-style Problem

You're going to simulate an API response.

Create:

```text
Success response
Error response
```

Success:

```text
status: "success"
data: ...
```

Error:

```text
status: "error"
message: ...
```

Then write:

```ts
function handleResponse(response: ApiResponse): string
```

If successful, return something based on the data.

If error, return the error message.

### Extra requirement

Make the design such that TypeScript **automatically knows**:

```ts
response.data
```

exists only when:

```ts
response.status === "success"
```

This is going to test whether you've really understood **discriminated unions**.

---

### One rule for Practice 03

**Don't ask me "which concept should I use?" initially.**

Try to figure it out from the problem.

That's the next step:

```text
Practice 01
"I know the syntax."

        ↓

Practice 02
"I can combine concepts."

        ↓

Practice 03
"I can choose the TypeScript concept myself."

        ↓

OOP / Generics / Async / Axios 🚀
```

Go straight into `03_mixed_fundamentals.ts`. This is where the real TypeScript muscle starts building. 💪