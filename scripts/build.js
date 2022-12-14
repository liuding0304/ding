const execSync = require('child_process').execSync;
const fse = require('fs-extra');
const path = require('path');

const stdio = { stdio: 'inherit' };

function resolve(p) {
  return path.resolve(__dirname, p)
}



// 构建article
execSync('pnpm run -F article docs:build', stdio)

// 构建blog
execSync('pnpm run -F blog build', stdio)

// 组合构建结果输入到dist
fse.ensureDirSync(resolve('../dist'))
fse.copySync(resolve('../packages/article/dist'), resolve('../dist'))
fse.copySync(resolve('../packages/article/dist'), resolve('../dist'))
fse.copySync(resolve('../packages/blog/dist'), resolve('../dist'))