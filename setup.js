#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Blacket development environment...\n');

// Check if git is available
try {
    execSync('git --version', { stdio: 'ignore' });
} catch (error) {
    console.error('❌ Git is not available in this environment');
    console.log('📝 Manual setup required:');
    console.log('1. Clone the submodules manually from:');
    console.log('   - https://github.com/BlacketPS/backend.git');
    console.log('   - https://github.com/BlacketPS/frontend.git');
    console.log('   - https://github.com/BlacketPS/types.git');
    console.log('   - https://github.com/BlacketPS/common.git');
    console.log('   - https://github.com/BlacketPS/core.git');
    console.log('   - https://github.com/BlacketPS/discord-bot.git');
    process.exit(1);
}

// Create placeholder directories and files for submodules if they don't exist
const submodules = ['backend', 'frontend', 'types', 'common', 'core', 'discord-bot'];

submodules.forEach(submodule => {
    const submodulePath = path.join(__dirname, submodule);
    if (!fs.existsSync(submodulePath)) {
        console.log(`📁 Creating placeholder for ${submodule}...`);
        fs.mkdirSync(submodulePath, { recursive: true });
        
        // Create a basic package.json for each submodule
        const packageJson = {
            name: `@blacket/${submodule}`,
            version: '3.0.0',
            private: true,
            scripts: {
                dev: 'echo "Submodule not initialized"',
                build: 'echo "Submodule not initialized"'
            }
        };
        
        fs.writeFileSync(
            path.join(submodulePath, 'package.json'),
            JSON.stringify(packageJson, null, 2)
        );
    }
});

console.log('✅ Blacket development environment setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Initialize git submodules: git submodule update --init --recursive');
console.log('2. Install dependencies: npm run install:all');
console.log('3. Start development: npm run dev');
console.log('\n💡 Note: This is a complex multi-repository project that requires proper git submodule setup.');