const fs = require('fs-extra');
const path = require('node:path');
const glob = require('glob');

const distDir = path.resolve(__dirname, 'dist');

console.group('Post Build Script');
glob.sync('src/**/*.json').forEach((jsonFile) => {
    const relativePath = path.relative('src', jsonFile);
    const dest = path.join(distDir, relativePath);
    fs.copySync(jsonFile, dest);
    console.log(`📄 Copied JSON: ${relativePath}`);
});

glob.sync('src/**/files/', { mark: true, onlyDirectories: true }).forEach((dir) => {
    const relativePath = path.relative('src', dir);
    const dest = path.join(distDir, relativePath);
    fs.copySync(dir, dest);
    console.log(`📁 Copied files/ folder: ${relativePath}`);
});

console.log('✅ Post Build Script finished successfully');

console.groupEnd('Post Build Script');
