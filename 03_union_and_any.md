# TypeScript — Union Types & Any

## 📌 Union Types

A **Union Type** allows a variable to hold more than one type of value.

We use the `|` operator to define a union.

```ts
let subs: number | string = "1M";

subs = 1.5;
```

Here, `subs` can contain either:

```text
string
   OR
number
```

So both of these are valid:

```ts
subs = "1M";
subs = 1.5;
```

But:

```ts
subs = true; // ❌
```

because `boolean` is not part of the union.

---

# 🔒 Union Types with Literal Types

A union can also restrict a variable to a **specific set of values**.

```ts
let apiRequestStatus: "pending" | "success" | "error" = "pending";
```

Now `apiRequestStatus` can have **only three possible values**:

```text
"pending"
"success"
"error"
```

For example:

```ts
apiRequestStatus = "success"; // ✅
apiRequestStatus = "error";   // ✅
```

But:

```ts
apiRequestStatus = "failed";  // ❌
```

because `"failed"` is not one of the allowed values.

### Another Example

```ts
let airlineSeat: "aisle" | "window" | "middle" = "window";
```

This variable can only contain:

```text
"aisle"
"window"
"middle"
```

### 💡 Mental Model

> **Union Type → choose one type from multiple types.**

```ts
string | number
```

> **Literal Union → choose one value from multiple allowed values.**

```ts
"pending" | "success" | "error"
```

---

# ⚠️ `any` Type

`any` means TypeScript essentially **stops checking the type** of that variable.

For example:

```ts
let currentOrder;
```

When TypeScript cannot determine a useful type for a variable, it can sometimes infer `any` depending on the context and compiler settings.

Then we could do:

```ts
currentOrder = "20";
currentOrder = 42;
currentOrder = true;
```

without getting the type-safety we normally expect.

### Why is `any` problematic?

The main purpose of TypeScript is to provide **type safety**.

Using `any` can remove that safety.

```ts
let currentOrder: any = "20";

currentOrder = 42;
currentOrder = true;
```

This defeats much of the benefit of TypeScript.

> **Avoid `any` when you can describe the actual type.**

---

# ✅ Better Approach

Instead of:

```ts
let currentOrder;
```

we can explicitly describe what the variable can contain:

```ts
let currentOrder: string | undefined;
```

This means:

```text
currentOrder
      │
      ├── string
      │
      └── undefined
```

Then:

```ts
const orders = ["10", "20", "30"];

let currentOrder: string | undefined;

for (let order of orders) {
    if (order === "20") {
        currentOrder = order;
        break;
    }
}

console.log(currentOrder);
```

Now TypeScript knows that `currentOrder` will either be:

```text
string
   OR
undefined
```

This is much safer than using `any`.

---

# 🧠 Why `undefined`?

At the time of declaration:

```ts
let currentOrder: string | undefined;
```

we haven't assigned a value yet.

So `undefined` represents the possibility that **no order has been found/assigned yet**.

If the loop finds `"20"`:

```text
currentOrder
      ↓
    "20"
```

If it doesn't find anything:

```text
currentOrder
      ↓
  undefined
```

This accurately represents the possible states of the variable.

---

# 🎯 Core Takeaways

| Concept                  | Meaning                                   |
| ------------------------ | ----------------------------------------- |
| **Union Type**           | Variable can have multiple types          |
| `string \| number`       | Either a string or number                 |
| **Literal Type**         | Restricts a value to a specific value     |
| `"pending" \| "success"` | Only those exact values are allowed       |
| **`any`**                | Disables useful type checking             |
| `string \| undefined`    | Value can be a string or not assigned yet |

### Mental Model

```text
Union
  │
  ├── Types
  │     └── string | number
  │
  └── Literal Values
        └── "pending" | "success" | "error"
```

> **Use unions to describe real possibilities instead of using `any to avoid errors`.**

[Check out the union and any code](./src/3_union_and_any.ts)