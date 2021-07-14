const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    
    webpack: {
        alias: {
            '@stores': resolvePath('./src/app/common/stores'),
            '@common': resolvePath('./src/app/common'),
        }
    },
  
}