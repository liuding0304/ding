const execSync = require('child_process').execSync;
execSync('pnpm run  --filter article  docs:build')
// 构建article

// 构建blog

// 组合构建结果输入到dist