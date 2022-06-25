# node-paths

## tl;dr

```
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

path.resolve(path.join(__dirname, "..", "foo", "bar", "test.txt"));
```
