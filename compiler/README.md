# @akarui/compiler

```js
const {
    sort_array,
    Compiler
} = require("@akarui/compiler")

const mycode = `my code $author$authorID`

const myfunctions = sort_array([
    "$authorID",
    "$author"
])

const compiler = new Compiler(mycode, myfunctions).start()

console.log(
    { code: compiler.get_compiled_code() },
    compiler.get_functions()
)
```
