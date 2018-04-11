# oxz

### local mock

```javascript
module.exports = {
  port: 9000,
  local: {
    root: path.resolve(__dirname, './data'),
  },
  proxy: {
    enable: false,
  ],
  // ...
}
```

### proxy

```javascript
module.exports = {
  // ...
  proxy: {
    enable: true,
    rules: [
        {
        pathes: [
            '/api/(.*)'
        ],
        target: 'https://127.0.0.1',
        host: 'xyz.com'
        },
        {
        pathes: [
            '*'
        ],
        target: 'http://localhost:9999',
        host: ''
        }proxyRules[program.proxy]
    },
  ]
  // ...
```