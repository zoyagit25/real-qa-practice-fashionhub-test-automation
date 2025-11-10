// 专门测试Firefox的脚本
const { execSync } = require('child_process');

console.log('🧪 Testing Firefox specifically...');

try {
  // 运行Firefox测试并显示详细日志
  const result = execSync('npx playwright test --project=firefox --headed --timeout=60000', { 
    encoding: 'utf8',
    stdio: 'inherit'
  });
  console.log('✅ Firefox tests completed successfully');
} catch (error) {
  console.log('❌ Firefox tests failed');
  process.exit(1);
}