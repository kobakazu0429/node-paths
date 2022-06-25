import { join, resolve, dirname } from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

// const __dirname = dirname(new URL(import.meta.url).pathname);
// const __dirname = fileURLToPath(new URL(".", import.meta.url))
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log("__dirname:", __dirname);

const assertPath = async ({ path, pathString }) => {
  try {
    const text = await fs.readFile(path, "utf-8");
    assert.equal(text, "hello\n");
    return { status: "pass", path, pathString };
  } catch (error) {
    return { status: "fail", path, pathString };
  }
}

const useJoin = () => {
  const paths = [
    {
      path: join("/", "foo", "bar", "test.txt"),
      pathString: `join("/", "foo", "bar", "test.txt")`
    },
    {
      path: join("foo", "bar", "test.txt"),
      pathString: `join("foo", "bar", "test.txt")`
    },
    {
      path: join("..", "foo", "bar", "test.txt"),
      pathString: `join("..", "foo", "bar", "test.txt")`
    },
    {
      path: join("..", "foo", "baz", "..", "bar", "test.txt"),
      pathString: `join("..", "foo", "baz", "..", "bar", "test.txt")`
    },
  ];

  return paths;
}
const useResolve = () => {
  const paths = [
    {
      path: resolve("/", "foo", "bar", "test.txt"),
      pathString: `resolve("/", "foo", "bar", "test.txt")`
    },
    {
      path: resolve("foo", "bar", "test.txt"),
      pathString: `resolve("foo", "bar", "test.txt")`
    },
    {
      path: resolve("..", "foo", "bar", "test.txt"),
      pathString: `resolve("..", "foo", "bar", "test.txt")`
    },
    {
      path: resolve("..", "foo", "baz", "..", "bar", "test.txt"),
      pathString: `resolve("..", "foo", "baz", "..", "bar", "test.txt")`
    },
  ];

  return paths;
}
const useJoinResolve = () => {
  const paths = [
    {
      path: resolve(join("/", "foo", "bar", "test.txt")),
      pathString: `resolve(join("/", "foo", "bar", "test.txt"))`
    },
    {
      path: resolve(join("foo", "bar", "test.txt")),
      pathString: `resolve(join("foo", "bar", "test.txt"))`
    },
    {
      path: resolve(join("..", "foo", "bar", "test.txt")),
      pathString: `resolve(join("..", "foo", "bar", "test.txt"))`
    },
    {
      path: resolve(join("..", "foo", "baz", "..", "bar", "test.txt")),
      pathString: `resolve(join("..", "foo", "baz", "..", "bar", "test.txt"))`
    },
  ];

  return paths;
}

const useJoinWithDirname = () => {
  const paths = [
    {
      path: join(__dirname, "/", "foo", "bar", "test.txt"),
      pathString: `join(__dirname, "/", "foo", "bar", "test.txt")`
    },
    {
      path: join(__dirname, "foo", "bar", "test.txt"),
      pathString: `join(__dirname, "foo", "bar", "test.txt")`
    },
    {
      path: join(__dirname, "..", "foo", "bar", "test.txt"),
      pathString: `join(__dirname, "..", "foo", "bar", "test.txt")`
    },
    {
      path: join(__dirname, "..", "foo", "baz", "..", "bar", "test.txt"),
      pathString: `join(__dirname, "..", "foo", "baz", "..", "bar", "test.txt")`
    },
  ];

  return paths;
}
const useResolveWithDirname = () => {
  const paths = [
    {
      path: resolve(__dirname, "/", "foo", "bar", "test.txt"),
      pathString: `resolve(__dirname, "/", "foo", "bar", "test.txt")`
    },
    {
      path: resolve(__dirname, "foo", "bar", "test.txt"),
      pathString: `resolve(__dirname, "foo", "bar", "test.txt")`
    },
    {
      path: resolve(__dirname, "..", "foo", "bar", "test.txt"),
      pathString: `resolve(__dirname, "..", "foo", "bar", "test.txt")`
    },
    {
      path: resolve(__dirname, "..", "foo", "baz", "..", "bar", "test.txt"),
      pathString: `resolve(__dirname, "..", "foo", "baz", "..", "bar", "test.txt")`
    },
  ];

  return paths;
}
const useJoinResolveWithDirname = () => {
  const paths = [
    {
      path: resolve(__dirname, join("/", "foo", "bar", "test.txt")),
      pathString: `resolve(__dirname, join("/", "foo", "bar", "test.txt"))`
    },
    {
      path: resolve(__dirname, join("foo", "bar", "test.txt")),
      pathString: `resolve(__dirname, join("foo", "bar", "test.txt"))`
    },
    {
      path: resolve(__dirname, join("..", "foo", "bar", "test.txt")),
      pathString: `resolve(__dirname, join("..", "foo", "bar", "test.txt"))`
    },
    {
      path: resolve(__dirname, join("..", "foo", "baz", "..", "bar", "test.txt")),
      pathString: `resolve(__dirname, join("..", "foo", "baz", "..", "bar", "test.txt"))`
    },
  ];

  return paths;
}
const useJoinWithDirnameResolve = () => {
  const paths = [
    {
      path: resolve(join(__dirname, "/", "foo", "bar", "test.txt")),
      pathString: `resolve(join(__dirname, "/", "foo", "bar", "test.txt"))`
    },
    {
      path: resolve(join(__dirname, "foo", "bar", "test.txt")),
      pathString: `resolve(join(__dirname, "foo", "bar", "test.txt"))`
    },
    {
      path: resolve(join(__dirname, "..", "foo", "bar", "test.txt")),
      pathString: `resolve(join(__dirname, "..", "foo", "bar", "test.txt"))`
    },
    {
      path: resolve(join(__dirname, "..", "foo", "baz", "..", "bar", "test.txt")),
      pathString: `resolve(join(__dirname, "..", "foo", "baz", "..", "bar", "test.txt"))`
    },
  ];

  return paths;
}


const main = async () => {
  const paths = [
    useJoin(),
    useResolve(),
    useJoinResolve(),
    useJoinWithDirname(),
    useResolveWithDirname(),
    useJoinResolveWithDirname(),
    useJoinWithDirnameResolve()
  ].flat(Infinity);
  // console.log(paths);

  const results = await Promise.all(paths.map(data => assertPath(data)));
  // console.log(results);

  console.log(results.filter(r => r.status === "pass").map(p => p.pathString));
  console.log(results.filter(r => r.status === "fail").map(p => p.pathString));
}

main();
