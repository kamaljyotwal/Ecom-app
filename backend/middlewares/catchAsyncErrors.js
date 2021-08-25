// module.exports = (func) => (req, res, next) => {
//   Promise.resolve(func(req, res, next)).catch(next);
// };
const myAsyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

module.exports = myAsyncHandler;
