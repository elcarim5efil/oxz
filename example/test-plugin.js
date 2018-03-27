module.exports = function() {
  return function({ hook }) {
    hook.on('requested', (ctx) => {
      // console.log('requested', ctx);
    });
    hook.on('jsonRead', (ctx) => {
      // console.log('jsonRead', ctx);
    });
    hook.on('beforeResponse', (ctx) => {
      // console.log('beforeResponse', ctx);
    });
  }
}