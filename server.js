const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain',
};

// Create the server
const server = http.createServer((req, res) => {
  // Sanitize the URL to prevent directory traversal attacks
  const sanitizedPath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');

  // Default to serving index.html if root is accessed
  const filePath = path.join(
    __dirname,
    sanitizedPath === '/' ? 'index.html' : sanitizedPath
  );

  // Determine the content type based on the file extension
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  // Serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        // Other server error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      // Successfully serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Use the port from the environment variable or default to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
