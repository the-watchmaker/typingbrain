
<img src="https://user-images.githubusercontent.com/4682613/221384204-7ad4aa02-ebea-4600-9163-eee724ea55de.jpg" width="480px" alt="typingbrain banner with a fish called Typin, The Brain Fish with a text that reads underestimate your brains today." />

# Turn your code into learning material

## How to use it

#### Step 1. Copy and paste a code snippet you want to memorize and get familiar with
<img src="https://user-images.githubusercontent.com/4682613/222879041-fb5b4b32-c317-4731-bc11-b1343820e9f1.gif" width="650px" alt="Showing how it works." />


#### Step 2. Add some notes about the code in markdown.

You can also hide parts of codes or skip typing them using comments like `@hide` and `@skip.`

<img src="https://user-images.githubusercontent.com/4682613/222879201-80d61cae-1c1e-40f7-b14c-54b0901a250e.gif" width="650px" alt="Showing how it works." />


#### Step 3. Hit the "Practice" button and start typing the code while reading the note
<img src="https://user-images.githubusercontent.com/4682613/222879268-634561c6-09ec-4c3f-bbdd-69b7a3a19134.gif" width="650px" alt="Showing how it works." />

<img src="https://user-images.githubusercontent.com/4682613/222945882-da196d76-ba21-4fc3-82b8-86dc007eee2c.gif" width="500px" alt="Showing how it works." />

Get feedbacks from mistakes.


#### Step 4. Keep practicing and see if it works!

Everyone's got different learning style. So it might not help you at all, but awesome if it did. It defintely helped me memorize syntax and methods when I was learning Rust.

![stanley-theoffice](https://user-images.githubusercontent.com/4682613/222879328-7974e961-cc24-42c7-ba85-1d082d59a32f.gif)


#### Step 5. Contribute


## Special comments

#### `@hide <string to hide>`

Say in this code, you want to hide `int` and `bar` for training purposes. 
```typescript
var foo: int = bar(boo);
```

You can do this:
```typescript
// @hide int
// @hide bar
var foo: int = bar(boo);
```

Resulting:
```typescript
var foo: ___ = ___(boo);
```

Note: the `@hide` will hide all the word (regx `/g`) within the same code block. Code blocks are separated by at least one line of comments including the inline ones.


#### `@skip`
Sometimes you don't want to type out everything. Like this one
```typescript
var hash = 'f3cf2c3eca9a2c2c088e27e6a696a272';
```
You can use `@skip` to make it just appear during the practice

```typescript
// @skip
var hash = 'f3cf2c3eca9a2c2c088e27e6a696a272';
```


## Why a desktop app?
I'm into desktop dApps built in electron and Tauri, true serverless/lambdaless interconnected apps. 



## Resources

## Practice code examples
[Go by Examples](https://github.com/mmcgrana/gobyexample/tree/master/examples)


### ChatGPT integration (Coming soon)

### Github integration (Coming soon)

### Web Link Generation (Coming Soon)


### To run and develop

Please visit: [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)



