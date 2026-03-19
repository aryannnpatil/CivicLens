const axios = require('axios');

async function checkAiService() {
    try {
        console.log('Testing connection to http://localhost:5000/health ...');
        const res = await axios.get('http://localhost:5000/health', { timeout: 5000 });
        console.log('✅ AI Service is UP:', res.data);
    } catch (err) {
        console.error('❌ AI Service is DOWN:', err.message);
        if (err.code === 'ECONNREFUSED') {
            console.error('   -> Check if the container is running and port 5000 is mapped.');
        }
    }
}

checkAiService();