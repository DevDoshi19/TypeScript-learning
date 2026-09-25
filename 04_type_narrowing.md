# TypeScript — Type Narrowing

## 📌 What is Type Narrowing?

**Type narrowing** is the process of taking a value that has a broad or multiple possible types and reducing it to a **more specific type** based on some condition.

In simple words:

> **Type narrowing means proving to TypeScript what type a value is before using it.**

For example:

```ts
function printId(id: string | number) {
    if (typeof id === "string") {
        // id → string
        console.log(id.toUpperCase());
    } else {
        // id → number
        console.log(id.toFixed(2));
    }
}
```

Initially:

```text
id → string | number
```

After:

```ts
typeof id === "string"
```

TypeScript knows:

```text
id → string
```

Inside the `else`:

```text
id → number
```

This is **type narrowing**.

---

# 🧠 Why Do We Need Type Narrowing?

This is the most important part.

Suppose an API can return either a successful response or an error:

```ts
type Response = {
    data: string;
} | {
    error: string;
};
```

Now imagine:

```ts
function handleResponse(response: Response) {
    console.log(response.data);
}
```

TypeScript gives an error.

Why?

Because `response` could be:

```text
{ data: string }
```

or:

```text
{ error: string }
```

If it is the second one, `response.data` doesn't exist.

So we first need to determine **which kind of response we actually received**.

That's where narrowing comes in.

```ts
function handleResponse(response: Response) {
    if ("data" in response) {
        console.log(response.data);
    } else {
        console.log(response.error);
    }
}
```

Now TypeScript understands:

```text
                 Response
                    │
           ┌────────┴────────┐
           ↓                 ↓
       has "data"        doesn't have "data"
           │                 │
           ↓                 ↓
       success             error
```

### The fundamental problem

A union says:

> "This value could be A or B."

Narrowing says:

> "Based on this condition, I know it is A here."

---

# 🔄 Broad Type → Narrow Type

Think of narrowing like filtering possibilities.

Suppose:

```ts
let value: string | number | boolean;
```

Initially:

```text
value
 ├── string
 ├── number
 └── boolean
```

After:

```ts
if (typeof value === "string") {
```

TypeScript can narrow it to:

```text
value
 └── string
```

After:

```ts
else if (typeof value === "number") {
```

it becomes:

```text
value
 └── number
```

And finally:

```text
value
 └── boolean
```

### Mental Model

> **Narrowing removes the possibilities that cannot be true.**

---

# 1. Narrowing with `typeof`

The most common narrowing technique is `typeof`.

```ts
function processValue(value: string | number) {

    if (typeof value === "string") {
        return value.toUpperCase();
    }

    return value.toFixed(2);
}
```

Initially:

```text
value → string | number
```

Inside:

```ts
typeof value === "string"
```

TypeScript knows:

```text
value → string
```

Therefore we get access to string methods:

```ts
value.toUpperCase()
value.length
value.includes()
```

In the other branch:

```text
value → number
```

So number methods become available.

---

# 2. Narrowing with Truthiness

We can also narrow using truthiness.

```ts
function greet(username?: string) {

    if (username) {
        return `Hello ${username}`;
    }

    return "Hello Guest";
}
```

Here:

```ts
username?: string
```

means:

```text
string | undefined
```

Before the `if`:

```text
username → string | undefined
```

Inside:

```ts
if (username)
```

TypeScript knows that `username` is truthy, so it narrows it to:

```text
username → string
```

This is useful when dealing with optional values.

---

# 3. Narrowing with Equality

We can narrow values by comparing them.

```ts
function getRole(role: "admin" | "user" | "guest") {

    if (role === "admin") {
        return "Full access";
    }

    if (role === "user") {
        return "Limited access";
    }

    return "Read-only access";
}
```

Initially:

```text
role
 ├── "admin"
 ├── "user"
 └── "guest"
```

After:

```ts
role === "admin"
```

TypeScript knows:

```text
role → "admin"
```

This is especially useful with **literal types**.

---

# 4. Narrowing with `in`

The `in` operator checks whether a property exists on an object.

Consider an API response:

```ts
type Success = {
    data: string;
};

type Failure = {
    error: string;
};

type ApiResponse = Success | Failure;
```

We can narrow it like this:

```ts
function handleResponse(response: ApiResponse) {

    if ("data" in response) {
        return response.data;
    }

    return response.error;
}
```

Why does this work?

Because only `Success` contains `data`.

```text
ApiResponse
     │
     ├── Success
     │     └── data
     │
     └── Failure
           └── error
```

So:

```ts
"data" in response
```

means:

> "If this property exists, this must be the Success object."

---

# 5. Narrowing with `instanceof`

`instanceof` is useful when working with classes.

```ts
class CreditCardPayment {

    pay() {
        return "Paid using credit card";
    }
}

class UPIPayment {

    pay() {
        return "Paid using UPI";
    }
}
```

Now:

```ts
function processPayment(
    payment: CreditCardPayment | UPIPayment
) {

    if (payment instanceof CreditCardPayment) {
        return payment.pay();
    }

    return payment.pay();
}
```

Before the check:

```text
payment
 ├── CreditCardPayment
 └── UPIPayment
```

After:

```ts
payment instanceof CreditCardPayment
```

TypeScript knows:

```text
payment → CreditCardPayment
```

And in the other branch:

```text
payment → UPIPayment
```

---

# 6. The Real Power of Narrowing

Consider a payment system.

```ts
type Payment =
    | {
        method: "card";
        cardNumber: string;
    }
    | {
        method: "upi";
        upiId: string;
    }
    | {
        method: "cash";
        amount: number;
    };
```

Now:

```ts
function processPayment(payment: Payment) {

    if (payment.method === "card") {
        return `Processing card ${payment.cardNumber}`;
    }

    if (payment.method === "upi") {
        return `Processing UPI ${payment.upiId}`;
    }

    return `Collecting cash ${payment.amount}`;
}
```

The important thing is that `method` acts as a **discriminator**.

```text
                    Payment
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
        card           upi          cash
          │            │             │
      cardNumber      upiId        amount
```

When TypeScript sees:

```ts
payment.method === "card"
```

it understands that the entire object must be the `card` variant.

This pattern is called a:

# Discriminated Union

A **discriminated union** is a union of object types that share a common property whose value identifies which variant they are.

Example:

```ts
type Payment =
    | { method: "card"; cardNumber: string }
    | { method: "upi"; upiId: string }
    | { method: "cash"; amount: number };
```

Here:

```text
method
```

is the **discriminant**.

---

# 7. Why Discriminated Unions Are So Useful

Imagine an application with many states:

```text
Payment
Order
User
API Response
Notification
Authentication
File Upload
```

Each can have multiple possible states.

Instead of doing this:

```ts
type Payment = any;
```

we can describe the actual possibilities:

```ts
type Payment =
    | { method: "card"; cardNumber: string }
    | { method: "upi"; upiId: string }
    | { method: "cash"; amount: number };
```

Now TypeScript helps us ensure that we handle the correct data for each state.

This gives us:

* Better autocomplete
* Better error detection
* Safer code
* Easier refactoring
* Clearer code structure

---

# 8. Exhaustive Checking

**Exhaustive checking** means making sure that we have handled **every possible case** of a union.

Consider:

```ts
type Status =
    | "pending"
    | "success"
    | "failed";
```

We can handle every case:

```ts
function getMessage(status: Status) {

    switch (status) {

        case "pending":
            return "Request is pending";

        case "success":
            return "Request completed";

        case "failed":
            return "Request failed";
    }
}
```

Now imagine later we add:

```ts
type Status =
    | "pending"
    | "success"
    | "failed"
    | "cancelled";
```

Our function is no longer handling every possible value.

That's where exhaustive checking becomes useful.

---

# 9. Using `never` for Exhaustive Checks

We can create a function:

```ts
function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}
```

Then:

```ts
function getMessage(status: Status) {

    switch (status) {

        case "pending":
            return "Request is pending";

        case "success":
            return "Request completed";

        case "failed":
            return "Request failed";

        default:
            return assertNever(status);
    }
}
```

If we later add:

```ts
"cancelled"
```

to `Status`, TypeScript will complain because `status` can now be `"cancelled"` and therefore is not `never`.

This helps us catch **missing cases during development**.

### Mental Model

```text
Union has 4 possible cases
          │
          ▼
     Check each case
          │
          ▼
Are all cases handled?
      │           │
     YES          NO
      │            │
      ▼            ▼
    done       TypeScript
               reports issue
```

---

# 10. Custom Type Guards

Sometimes TypeScript cannot automatically determine the exact type.

For example:

```ts
type User = {
    name: string;
    age: number;
};
```

Suppose we receive unknown data:

```ts
function processData(data: unknown) {

}
```

We cannot directly do:

```ts
data.name;
```

because `unknown` means:

> "I don't know what this value is yet."

We need to verify it.

We can create a custom type guard.

```ts
function isUser(value: unknown): value is User {

    return (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        "age" in value &&
        typeof value.name === "string" &&
        typeof value.age === "number"
    );
}
```

Now:

```ts
function processData(data: unknown) {

    if (isUser(data)) {
        return data.name;
    }

    return "Not a valid user";
}
```

---

# 11. What Does `value is User` Mean?

This is the important part:

```ts
value is User
```

is called a **type predicate**.

It tells TypeScript:

> "If this function returns `true`, you can treat `value` as a `User`."

Before:

```text
data → unknown
```

After:

```ts
if (isUser(data)) {
```

TypeScript knows:

```text
data → User
```

So we can safely access:

```ts
data.name
data.age
```

### Mental Model

```text
unknown
   │
   ▼
isUser(data)
   │
   ├── true  → User
   │
   └── false → not User
```

---

# 12. Why Not Just Use `any`?

We could write:

```ts
function processData(data: any) {
    return data.name;
}
```

But now TypeScript trusts us blindly.

If `data` is:

```ts
42
```

we can run into runtime problems.

With:

```ts
unknown
```

TypeScript forces us to **prove what the value is**.

That is exactly where type guards become useful.

```text
any
 │
 └── "Trust me"

unknown
 │
 └── "Prove it first"
```

This is one of the most important differences between `any` and `unknown`.

---

# 13. Type Narrowing with `unknown`

A very common real-world example is parsing external data.

```ts
function handleInput(input: unknown) {

    if (typeof input === "string") {
        return input.toUpperCase();
    }

    if (typeof input === "number") {
        return input.toFixed(2);
    }

    return "Unsupported input";
}
```

The input could come from:

* API responses
* User input
* JSON
* External libraries
* Database data

We don't automatically trust its type.

We first **narrow it**.

---

# 14. Narrowing Flow

TypeScript keeps track of the information we establish through conditions.

Example:

```ts
function example(value: string | number) {

    if (typeof value === "string") {

        // value → string

    } else {

        // value → number
    }
}
```

Think of it as a flow:

```text
              string | number
                    │
             typeof check
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
       string               number
```

This is why TypeScript can provide the correct autocomplete and catch invalid operations.

---

# 15. Different Narrowing Techniques

TypeScript provides several ways to narrow types.

| Technique            | Used For                          |
| -------------------- | --------------------------------- |
| `typeof`             | Primitive types                   |
| `===` / `!==`        | Specific values                   |
| Truthiness           | `null`, `undefined`, empty values |
| `in`                 | Object properties                 |
| `instanceof`         | Classes / objects                 |
| Type predicates      | Custom type checks                |
| Discriminated unions | Object variants                   |
| `switch`             | Multiple known cases              |

---

# 🧠 The Core Idea

Don't think:

> "Type narrowing is a TypeScript feature I need to memorize."

Think:

> **"My variable has multiple possible shapes. I need to establish which shape I currently have before using its specific properties or methods."**

For example:

```text
              Payment
                 │
       ┌─────────┼─────────┐
       ↓         ↓         ↓
      Card       UPI      Cash
       │         │         │
   cardNumber   upiId     amount
```

TypeScript initially sees:

```text
Payment = Card | UPI | Cash
```

Then we give it information:

```ts
if (payment.method === "card")
```

Now TypeScript can narrow:

```text
Payment
   ↓
 Card
```

That's the entire idea.

---

# 🎯 Final Mental Model

```text
             BROAD TYPE
                  │
                  ▼
        "What could this be?"
                  │
                  ▼
             Check / Guard
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
    Condition             Condition
      true                  false
       │                     │
       ▼                     ▼
  Narrowed Type          Other Type
       │                     │
       ▼                     ▼
  Safely use its         Safely use its
  properties/methods     properties/methods
```

### Remember These 4 Things

**1. Union types create possibilities**

```ts
string | number
```

**2. Narrowing removes possibilities**

```ts
typeof value === "string"
```

**3. Type predicates let us create our own narrowing rules**

```ts
value is User
```

**4. Exhaustive checking makes sure every possible case is handled**

```ts
never
```

> **Type narrowing = reducing uncertainty about a value so TypeScript can safely work with its specific type.**

[Check out the type narrowing code](./src/4_type_narrowing.ts)