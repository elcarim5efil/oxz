module.exports = function(ctx) {
  return new Promise(resolve => {
    setTimeout(() => {
      Object.assign(ctx.body, {
        ye: 'sss'
      });
      resolve();
    }, 1000);
  });
}