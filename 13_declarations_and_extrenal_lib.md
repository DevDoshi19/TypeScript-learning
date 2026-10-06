# TypeScript Declarations, `.d.ts`, Axios & Fetch

## 📌 Overview

When working with TypeScript, you will often use JavaScript libraries that were written by someone else.

For example:

```bash
npm install axios
```

The library itself may contain JavaScript code, but TypeScript needs to know:

```text
What functions exist?
What parameters do they accept?
What do they return?
What types do they use?
```

This is where **declarations** and `.d.ts` files become important.

This topic covers:

```text
Declaration files
.d.ts
@types
declare module
Axios
AxiosResponse
fetch
API response typing
error handling
```

---

# 1. What Is a Declaration?

A declaration tells TypeScript:

> **"This thing exists, and this is its type."**

For example:

```ts
declare const username: string;
```

This tells TypeScript:

```text
There is a variable called username
and it is a string.
```

But we haven't implemented it.

We are only describing it.

Think:

```text
Declaration
    ↓
WHAT exists?

Implementation
    ↓
HOW it works?
```

---

# 2. What Is a `.d.ts` File?

A `.d.ts` file is a **TypeScript declaration file**.

The `.d.ts` extension means:

```text
.d → declaration
.ts → TypeScript
```

So:

```text
something.d.ts
```

usually contains **type information**, not normal runtime implementation.

Example:

```ts
declare const username: string;
```

There is no:

```ts
const username = "Dev";
```

because the declaration file is only telling TypeScript about something that exists somewhere else.

---

# 3. Why Do We Need Declaration Files?

Imagine you install a JavaScript library:

```bash
npm install some-lib
```

The library might contain:

```js
function someFunction() {
    console.log("Hello");
}

module.exports = {
    someFunction
};
```

JavaScript doesn't need TypeScript type information.

But your TypeScript code wants to do:

```ts
import { someFunction } from "some-lib";

someFunction();
```

TypeScript asks:

> "What is `someFunction`?"

If the library doesn't provide type information, TypeScript may not know.

That's where declaration files help.

---

# 4. Three Common Situations

When using an external library, think about this order:

```text
Library
   │
   ▼
Does it provide TypeScript types?
   │
   ├── YES → use them
   │
   └── NO
        │
        ▼
    Check @types
        │
        ├── YES → install @types/package
        │
        └── NO
             │
             ▼
        Create your own .d.ts
```

---

# 5. Libraries With Built-In Types

Many modern libraries already include their TypeScript declarations.

For example:

```bash
npm install axios
```

Axios provides its own TypeScript types.

So you normally **do not need**:

```bash
npm install @types/axios
```

In fact, Axios itself provides the necessary type definitions.

Then you can write:

```ts
import axios from "axios";
```

and TypeScript understands Axios.

---

# 6. What Is `@types`?

Some JavaScript libraries were created before TypeScript became common or don't ship their own type definitions.

The community maintains many type definitions under:

```text
@types
```

For example:

```bash
npm install some-lib
```

If `some-lib` doesn't provide types, you may find:

```bash
npm install @types/some-lib
```

This installs TypeScript declarations for that JavaScript library.

Conceptually:

```text
some-lib
   ↓
JavaScript implementation

@types/some-lib
   ↓
TypeScript declarations
```

---

# 7. Why Are They Separate?

Imagine:

```text
some-lib/
    ├── index.js
    └── package.json
```

The library works perfectly in JavaScript.

But TypeScript doesn't know the types.

Then:

```text
@types/some-lib/
    └── index.d.ts
```

provides the missing type information.

So:

```text
JavaScript library
       +
Type declarations
       ↓
TypeScript can understand the library
```

---

# 8. Creating Your Own Declaration File

Sometimes:

```text
Library has no types
       ↓
No @types package exists
       ↓
You create your own declaration
```

For example:

```text
some-lib.d.ts
```

Inside:

```ts
declare module "some-lib" {

    export function someFunction(): void;

}
```

Now TypeScript understands:

```ts
import { someFunction } from "some-lib";

someFunction();
```

---

# 9. What Does `declare module` Mean?

This:

```ts
declare module "some-lib" {
    export function someFunction(): void;
}
```

basically tells TypeScript:

> "There is a module called `some-lib`, and it exports a function called `someFunction`."

You aren't implementing the module.

You're describing an existing module.

```text
declare module
      ↓
"TypeScript, trust that this module exists
and this is its shape."
```

---

# 10. `.d.ts` Does Not Create Runtime Code

This is extremely important.

Suppose:

```ts
// some-lib.d.ts

declare module "some-lib" {
    export function someFunction(): void;
}
```

This does **not** create:

```js
someFunction();
```

It only tells TypeScript what exists.

The actual implementation must come from the real package.

```text
some-lib
    │
    ├── actual JavaScript implementation
    │
    └── declaration file
             ↓
       TypeScript information
```

---

# 11. Declaration vs Implementation

Think of it like this:

```text
.d.ts
    ↓
Blueprint / description

.js
    ↓
Actual implementation
```

For example:

```ts
// declaration
export function add(a: number, b: number): number;
```

The declaration says:

```text
add
 ├── accepts number
 ├── accepts number
 └── returns number
```

Some JavaScript file somewhere actually implements it.

---

# 12. Axios

Now let's connect declarations to a real library.

Install Axios:

```bash
npm install axios
```

Then:

```ts
import axios from "axios";
```

Axios provides TypeScript declarations, so TypeScript knows things such as:

```text
axios.get()
axios.post()
axios.put()
axios.delete()
```

and their parameters/return types.

---

# 13. Creating a Todo Type

Suppose our API returns:

```json
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}
```

We can describe this response:

```ts
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
```

Now TypeScript understands the expected shape.

---

# 14. Axios Without Explicit Response Type

You can write:

```ts
const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
);
```

Axios knows the structure of its own response object.

But the API's actual data shape isn't automatically known to TypeScript.

We can tell Axios what `data` should contain using a generic.

---

# 15. Axios + Generics

Axios methods support generics.

For example:

```ts
const response =
    await axios.get<Todo>(
        "https://jsonplaceholder.typicode.com/todos/1"
    );
```

Here:

```text
Todo
  ↓
T
  ↓
Axios knows response.data is Todo
```

Therefore:

```ts
response.data.title;
response.data.completed;
```

are type-safe.

---

# 16. `AxiosResponse<T>`

You may also see:

```ts
import axios, { type AxiosResponse } from "axios";
```

Then:

```ts
const response: AxiosResponse<Todo> =
    await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
    );
```

This means:

```text
AxiosResponse<Todo>
       │
       ├── status
       ├── headers
       ├── config
       └── data
              ↓
            Todo
```

So:

```ts
response.data
```

is known as:

```ts
Todo
```

---

# 17. `AxiosResponse<T>` Is a Generic Interface/Type

This connects directly to the generics you just learned.

Conceptually:

```text
AxiosResponse<T>
```

means:

```text
T = actual API data type
```

So:

```ts
AxiosResponse<Todo>
```

means:

```text
AxiosResponse
       │
       └── data: Todo
```

And:

```ts
AxiosResponse<User[]>
```

would mean:

```text
AxiosResponse
       │
       └── data: User[]
```

---

# 18. A Clean Axios Example

```ts
import axios from "axios";

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const fetchData = async () => {

    try {

        const response =
            await axios.get<Todo>(
                "https://jsonplaceholder.typicode.com/todos/1"
            );

        console.log("Todo:", response.data);

    } catch (error) {

        console.error("Error fetching data:", error);
    }
};

fetchData();
```

This is usually cleaner than manually annotating the entire response as `AxiosResponse<Todo>`.

Why?

Because Axios already knows its response type.

You only need to tell it:

```text
"What type is the API data?"
```

So:

```ts
axios.get<Todo>()
```

is enough.

---

# 19. What Happens Internally?

Conceptually:

```ts
axios.get<Todo>(url)
```

means something like:

```text
axios.get
   │
   ▼
T = Todo
   │
   ▼
Promise<AxiosResponse<Todo>>
   │
   ▼
await
   │
   ▼
AxiosResponse<Todo>
   │
   ▼
response.data
   │
   ▼
Todo
```

This is a perfect example of **generics + external library declarations working together**.

---

# 20. Important: TypeScript Does NOT Validate API Data

This is a very important limitation.

Suppose you write:

```ts
axios.get<Todo>(url);
```

You are telling TypeScript:

> "Treat the response data as `Todo`."

It does **not** mean Axios checks the server response and guarantees it really is a `Todo`.

For example, the server could theoretically return:

```json
{
    "hello": "world"
}
```

TypeScript won't automatically validate that runtime data.

This is similar to type assertions.

```text
TypeScript type
       ≠
Runtime validation
```

For runtime validation, libraries such as Zod can be used.

---

# 21. Fetch API

You don't need Axios to make HTTP requests.

JavaScript also provides:

```ts
fetch()
```

Example:

```ts
const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1"
);
```

`fetch()` returns a:

```text
Promise<Response>
```

---

# 22. `response.ok`

With `fetch`, HTTP errors require some manual handling.

```ts
if (!response.ok) {
    throw new Error(
        `HTTP error! status: ${response.status}`
    );
}
```

Why?

Because `fetch()` does **not automatically reject the promise for normal HTTP errors like 404 or 500**.

So:

```text
Network failure
    ↓
fetch rejects

HTTP 404 / 500
    ↓
fetch can still resolve
    ↓
check response.ok
```

This is an important difference from how Axios commonly handles HTTP errors.

---

# 23. Reading JSON

After receiving the response:

```ts
const data = await response.json();
```

`response.json()` parses the response body.

Then we can describe the expected structure:

```ts
const data: Todo = await response.json();
```

So:

```text
HTTP response
      ↓
response.json()
      ↓
JavaScript object
      ↓
Todo type
```

---

# 24. Complete Fetch Example

```ts
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const fetchData = async () => {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/1"
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}`
            );
        }

        const data: Todo = await response.json();

        console.log("Todo:", data);

    } catch (error) {

        console.error(
            "Error fetching data:",
            error
        );
    }
};

fetchData();
```

---

# 25. Axios vs Fetch

Both can perform HTTP requests.

| Feature | Axios | Fetch |
|---|---|---|
| Built into browser | ❌ | ✅ |
| External package | ✅ | ❌ |
| TypeScript support | Built-in declarations | Built into TS DOM types |
| JSON parsing | Convenient | `response.json()` |
| HTTP error handling | Commonly rejects for non-2xx | Must check `response.ok` |
| Request/response interceptors | ✅ | Not built in |
| Generic API typing | ✅ | Manual typing |
| Popular in backend/frontend | ✅ | ✅ |

The important thing isn't:

> "Which one is better?"

Instead understand:

```text
Axios
  ↓
external library
  ↓
declarations
  ↓
generics
  ↓
typed API response
```

while:

```text
Fetch
  ↓
built-in Web API
  ↓
Response type
  ↓
response.json()
  ↓
your expected type
```

---

# 26. Error Handling

You used:

```ts
catch (error: any)
```

This works, but `any` isn't ideal.

Remember:

```text
any
↓
TypeScript stops protecting you
```

A safer approach is:

```ts
catch (error: unknown) {
    // narrow error before using it
}
```

For normal JavaScript errors:

```ts
catch (error: unknown) {

    if (error instanceof Error) {
        console.error(error.message);
    }

}
```

Now TypeScript knows:

```text
error
  ↓
Error
```

inside the condition.

---

# 27. Axios Error Handling

Axios provides a helper for checking whether an error is an Axios error.

The important pattern is:

```ts
import axios from "axios";

try {

    await axios.get<Todo>(url);

} catch (error: unknown) {

    if (axios.isAxiosError(error)) {
        console.error(error.message);
        console.error(error.response?.status);
        console.error(error.response?.data);
    }

}
```

Notice this:

```ts
axios.isAxiosError(error)
```

not:

```ts
error.isAxiosError(error)
```

The latter is incorrect because `error` itself is not the Axios object.

The helper belongs to:

```text
axios
  ↓
isAxiosError()
```

---

# 28. Why `unknown` Is Better in `catch`

Instead of:

```ts
catch (error: any)
```

prefer:

```ts
catch (error: unknown)
```

Then narrow:

```ts
if (axios.isAxiosError(error)) {
    // Axios error
}
```

or:

```ts
if (error instanceof Error) {
    // normal JavaScript Error
}
```

This follows the TypeScript principle you already learned:

```text
unknown
   ↓
narrow
   ↓
use safely
```

---

# 29. Axios Error Flow

A clean mental model:

```text
catch(error: unknown)
          │
          ▼
   Is Axios error?
          │
     ┌────┴────┐
     │         │
    YES        NO
     │         │
     ▼         ▼
isAxiosError  instanceof Error
     │         │
     ▼         ▼
Axios data   normal error
```

---

# 30. Declaration Files + Generics Together

This is where all the concepts connect.

When you install:

```bash
npm install axios
```

Axios provides TypeScript declarations.

Those declarations describe things like:

```text
axios.get
axios.post
AxiosResponse
AxiosError
...
```

Many of those APIs use generics.

So when you write:

```ts
axios.get<Todo>(url)
```

you are using:

```text
External Library
       │
       ▼
Declaration File
       │
       ▼
Generic API
       │
       ▼
Todo
       │
       ▼
Type-safe code
```

This is a very real-world TypeScript workflow.

---

# 31. `.d.ts` + Generics Example

Imagine a library:

```text
some-lib
```

and its declaration:

```ts
declare module "some-lib" {

    export function getData<T>(): Promise<T>;

}
```

Now your application can do:

```ts
import { getData } from "some-lib";

interface User {
    id: number;
    name: string;
}

const user = await getData<User>();
```

The generic flows through the declaration:

```text
getData<T>
    │
    ▼
T = User
    │
    ▼
Promise<User>
```

This is exactly the same generic concept you just learned.

---

# 32. Declaration Files vs TypeScript Files

A normal `.ts` file can contain:

```text
types
+
implementation
```

Example:

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

A `.d.ts` file generally contains:

```text
types / declarations
```

Example:

```ts
declare function add(
    a: number,
    b: number
): number;
```

No implementation.

---

# 33. Mental Model for `.d.ts`

Think of `.d.ts` as:

> **A type-level map of code that exists somewhere else.**

For example:

```text
             JavaScript Library
                    │
             actual implementation
                    │
                    ▼
                some-lib
                    │
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
       runtime             TypeScript
                            declarations
                                │
                                ▼
                             .d.ts
```

The `.d.ts` tells TypeScript what the JavaScript library looks like.

---

# 34. The Complete Big Picture

You've now connected several TypeScript concepts:

```text
                     TypeScript
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    Generics          Interfaces      Declarations
        │                │                │
        │                │                ▼
        │                │              .d.ts
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                  External Libraries
                         │
                         ▼
                       Axios
                         │
                         ▼
                 axios.get<Todo>()
                         │
                         ▼
                  Typed API Response
```

---

# 🎯 What You Actually Need to Remember

## 1. Declaration

```ts
declare const value: string;
```

Means:

> "This exists. I'm just telling TypeScript about it."

---

## 2. `.d.ts`

```text
.d.ts
```

is a declaration file containing type information.

It normally doesn't contain runtime implementation.

---

## 3. `@types`

If a JavaScript library doesn't provide its own types:

```bash
npm install @types/some-lib
```

may provide community-maintained declarations.

---

## 4. `declare module`

```ts
declare module "some-lib" {
    export function someFunction(): void;
}
```

means:

> "TypeScript, this module exists and this is its API."

---

## 5. Axios generics

```ts
axios.get<Todo>(url)
```

means:

```text
API response data → Todo
```

---

## 6. `AxiosResponse<T>`

```ts
AxiosResponse<Todo>
```

means:

```text
response.data → Todo
```

---

## 7. Fetch

```ts
const response = await fetch(url);
```

Then:

```ts
if (!response.ok) {
    throw new Error(...);
}

const data: Todo = await response.json();
```

---

## 8. Runtime validation

This:

```ts
const data: Todo = await response.json();
```

does **not** validate the server response at runtime.

It only tells TypeScript what type you expect.

---

## 9. Error handling

Prefer:

```ts
catch (error: unknown)
```

then narrow:

```ts
if (error instanceof Error) {
    // ...
}
```

or for Axios:

```ts
if (axios.isAxiosError(error)) {
    // ...
}
```

---

# 🧠 Final Mental Model

```text
External JavaScript Library
            │
            ▼
     Does it have types?
            │
       ┌────┴────┐
       │         │
      YES        NO
       │         │
       │      @types?
       │         │
       │    ┌────┴────┐
       │    │         │
       │   YES        NO
       │    │         │
       │    │      create .d.ts
       │    │         │
       └────┴─────────┘
                │
                ▼
        TypeScript understands
        the external library
                │
                ▼
             Generics
                │
                ▼
          axios.get<Todo>()
                │
                ▼
          Typed API Response
```

The key idea is:

> **Declaration files tell TypeScript what external JavaScript code looks like, while generics let us precisely describe the data flowing through that code.**

And that's exactly why something like:

```ts
axios.get<Todo>(url)
```

is so powerful:

```text
axios
  ↓
external library
  ↓
.d.ts declarations
  ↓
generic <Todo>
  ↓
response.data → Todo
  ↓
type-safe application 🚀
```