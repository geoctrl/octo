import { readdir, readFile, lstat } from "fs/promises";
import path from "path";
import picomatch from "picomatch";
import { Index } from "flexsearch";

class Search {
  async run(nextPath: string) {
    return this.getFilesRecursively(nextPath, "");
  }

  async getFilesRecursively(
    basePath: string,
    nextPath: string,
    ignore: string[] = [".git"]
  ): Promise<string[]> {
    let f: string[] = [];
    let ignoreNext: string[] = ignore;

    const files = await readdir(path.resolve(basePath, nextPath));

    if (files.includes(".gitignore")) {
      const res = await readFile(
        path.resolve(basePath, nextPath, ".gitignore"),
        "utf8"
      );
      ignoreNext = [
        ...ignoreNext,
        ...res
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => {
            if (l.startsWith("#")) return false;
            return !!l;
          }),
      ];
    }

    for await (let file of files) {
      const filePath = path.join(nextPath, file);
      const fileStat = await lstat(path.resolve(basePath, filePath));

      if (picomatch.isMatch(filePath, ignoreNext)) {
        continue;
      }

      if (fileStat.isDirectory()) {
        f = [...f, ...(await this.getFilesRecursively(basePath, filePath))];
      } else {
        f.push(file);
        // await openFile(filePath)
      }
    }
    return f;
  }

  async searchFile(term: string, filePath: string) {
    const file = await readFile(filePath, "utf8");
    const index = new Index();
    const test = await index.add(1, "John Doe");
    const result = await index.searchAsync(term, {
      limit: 99999,
    });
    console.log("result", result);
  }
}

export const search = new Search();
