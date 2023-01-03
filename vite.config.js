// npm i -D vite vite-plugin-mkcert vite-plugin-imagemin

import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import dns from "dns";

// for localhost url
dns.setDefaultResultOrder("verbatim");

// imagemin
import viteImagemin from "vite-plugin-imagemin";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

//#region - start of - workspace config
const wsc = {
  srcDir: "./"
};
//#endregion - end of - workspace config

//#region - start of - keeping file structure for images
import { promises as fsPromises } from "node:fs";
import { promisify } from "node:util";
import path from "node:path";
import fs from "graceful-fs";

const writeFile = promisify(fs.writeFile);

const convertToWebp = async () => {
  console.time("✨ Images optimized in");
  await imagemin([`${wsc.srcDir}/images/**/*.{jpeg,jpg,png}`], {
    plugins: [imageminWebp({ quality: 80 })]
  }).then(files =>
    files.forEach(async v => {
      let source = path.parse(v.sourcePath);
      v.destinationPath = `${source.dir}/${source.name}.webp`; // source.dir.replace(srcdir, distdir)
      await fsPromises.mkdir(path.dirname(v.destinationPath), {
        recursive: true
      });
      await writeFile(v.destinationPath, v.data);
    })
  );
  console.timeEnd("✨ Images optimized in");
};
//#endregion - end of - keeping file structure for images

export default defineConfig({
  root: `${wsc.srcDir}`,
  plugins: [mkcert(), convertToWebp()],
  server: {
    https: true,
    host: true,
    // open: true,
    port: 3000
  }
});
