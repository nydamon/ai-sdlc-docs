const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// AI-SDLC validation endpoint
app.get('/api/validate', (req, res) => {
  try {
    const result = execSync('./ai-sdlc validate', { encoding: 'utf8' });
    const reportPath = './AI_SDLC_VALIDATION_REPORT.md';

    let report = null;
    if (fs.existsSync(reportPath)) {
      report = fs.readFileSync(reportPath, 'utf8');
    }

    res.json({
      success: true,
      output: result,
      report: report,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// AI-SDLC repair endpoint
app.post('/api/repair', (req, res) => {
  try {
    const result = execSync('./ai-sdlc repair', { encoding: 'utf8' });

    res.json({
      success: true,
      output: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Project status endpoint
app.get('/api/status', (req, res) => {
  try {
    const result = execSync('./ai-sdlc status', { encoding: 'utf8' });

    res.json({
      success: true,
      output: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Run tests endpoint
app.post('/api/test', (req, res) => {
  const { type = 'unit' } = req.body;

  try {
    let command = 'npm run test';
    if (type === 'unit') command = 'npm run test:unit';
    if (type === 'e2e') command = 'npm run test:e2e';
    if (type === 'coverage') command = 'npm run test:coverage';

    const result = execSync(command, { encoding: 'utf8' });

    res.json({
      success: true,
      output: result,
      type: type,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      type: type,
      timestamp: new Date().toISOString(),
    });
  }
});

// Project metrics endpoint
app.get('/api/metrics', (req, res) => {
  try {
    // Collect various metrics
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    const gitLog = execSync('git log --oneline -10', { encoding: 'utf8' });

    // Count files
    const jsFiles = execSync(
      'find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | grep -v node_modules | wc -l',
      { encoding: 'utf8' }
    ).trim();
    const testFiles = execSync(
      'find . -name "*.test.*" -o -name "*.spec.*" | grep -v node_modules | wc -l',
      { encoding: 'utf8' }
    ).trim();

    res.json({
      project: {
        name: packageJson.name,
        version: packageJson.version,
        dependencies: Object.keys(packageJson.dependencies || {}).length,
        devDependencies: Object.keys(packageJson.devDependencies || {}).length,
      },
      files: {
        total: parseInt(jsFiles),
        tests: parseInt(testFiles),
      },
      git: {
        uncommittedChanges: gitStatus.split('\n').filter((line) => line.trim())
          .length,
        recentCommits: gitLog.split('\n').filter((line) => line.trim()).length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Dashboard HTML
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>AI-SDLC Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #0f314b, #ff902a); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        button { background: #0f314b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
        button:hover { background: #ff902a; }
        .status { padding: 10px; border-radius: 5px; margin: 10px 0; }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        pre { background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 AI-SDLC Dashboard</h1>
            <p>The Credit Pros - Development Automation Control Center</p>
        </div>
        
        <div class="grid">
            <div class="card">
                <h3>🔍 Validation</h3>
                <button onclick="runValidation()">Run Validation</button>
                <div id="validation-result"></div>
            </div>
            
            <div class="card">
                <h3>🔧 Auto-Repair</h3>
                <button onclick="runRepair()">Run Repair</button>
                <div id="repair-result"></div>
            </div>
            
            <div class="card">
                <h3>📊 Status</h3>
                <button onclick="getStatus()">Get Status</button>
                <div id="status-result"></div>
            </div>
            
            <div class="card">
                <h3>🧪 Tests</h3>
                <button onclick="runTests('unit')">Unit Tests</button>
                <button onclick="runTests('coverage')">Coverage</button>
                <button onclick="runTests('e2e')">E2E Tests</button>
                <div id="test-result"></div>
            </div>
        </div>
        
        <div class="card">
            <h3>📈 Project Metrics</h3>
            <button onclick="getMetrics()">Refresh Metrics</button>
            <div id="metrics-result"></div>
        </div>
    </div>

    <script>
        async function apiCall(endpoint, options = {}) {
            try {
                const response = await fetch(endpoint, options);
                const data = await response.json();
                return data;
            } catch (error) {
                return { success: false, error: error.message };
            }
        }

        async function runValidation() {
            const result = document.getElementById('validation-result');
            result.innerHTML = '<div class="status">Running validation...</div>';
            
            const data = await apiCall('/api/validate');
            
            if (data.success) {
                result.innerHTML = \`
                    <div class="status success">Validation completed successfully</div>
                    <pre>\${data.output}</pre>
                \`;
            } else {
                result.innerHTML = \`
                    <div class="status error">Validation failed: \${data.error}</div>
                \`;
            }
        }

        async function runRepair() {
            const result = document.getElementById('repair-result');
            result.innerHTML = '<div class="status">Running auto-repair...</div>';
            
            const data = await apiCall('/api/repair', { method: 'POST' });
            
            if (data.success) {
                result.innerHTML = \`
                    <div class="status success">Repair completed successfully</div>
                    <pre>\${data.output}</pre>
                \`;
            } else {
                result.innerHTML = \`
                    <div class="status error">Repair failed: \${data.error}</div>
                \`;
            }
        }

        async function getStatus() {
            const result = document.getElementById('status-result');
            result.innerHTML = '<div class="status">Getting status...</div>';
            
            const data = await apiCall('/api/status');
            
            if (data.success) {
                result.innerHTML = \`
                    <div class="status success">Status retrieved successfully</div>
                    <pre>\${data.output}</pre>
                \`;
            } else {
                result.innerHTML = \`
                    <div class="status error">Status failed: \${data.error}</div>
                \`;
            }
        }

        async function runTests(type) {
            const result = document.getElementById('test-result');
            result.innerHTML = \`<div class="status">Running \${type} tests...</div>\`;
            
            const data = await apiCall('/api/test', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type })
            });
            
            if (data.success) {
                result.innerHTML = \`
                    <div class="status success">\${type} tests completed successfully</div>
                    <pre>\${data.output}</pre>
                \`;
            } else {
                result.innerHTML = \`
                    <div class="status error">\${type} tests failed: \${data.error}</div>
                \`;
            }
        }

        async function getMetrics() {
            const result = document.getElementById('metrics-result');
            result.innerHTML = '<div class="status">Loading metrics...</div>';
            
            const data = await apiCall('/api/metrics');
            
            if (data.success) {
                result.innerHTML = \`
                    <div class="status success">Metrics loaded successfully</div>
                    <pre>\${JSON.stringify(data, null, 2)}</pre>
                \`;
            } else {
                result.innerHTML = \`
                    <div class="status error">Metrics failed: \${data.error}</div>
                \`;
            }
        }

        // Auto-refresh metrics on page load
        window.onload = () => {
            getMetrics();
        };
    </script>
</body>
</html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🤖 AI-SDLC Dashboard running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
