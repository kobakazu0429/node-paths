# node-paths

## tl;dr

```
const __dirname = dirname(fileURLToPath(import.meta.url));

path.resolve(path.join(__dirname, "..", "foo", "bar", "test.txt"));
```
