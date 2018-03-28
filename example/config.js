const pathTo = require('path');

module.exports = {
  local: {
    root: pathTo.resolve(__dirname),
  },
  proxy: {
    rules: {
      local: [
        {
          pathes: [
            '/userAvatarAndCartNumAjax.html'
          ],
          target: 'https://59.111.160.202',
          host: 'm.kaola.com'
        },
        {
          pathes: [
            '*'
          ],
          target: 'http://localhost:9000',
          host: ''
        }
      ]
    }
  },
  plugins: [
  ]
};