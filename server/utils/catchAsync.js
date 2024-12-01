//wrap any async function in this so you won't need to try catch every time,
//it will catch any error and pass it to the next middleware
// look at module.exports in the end of authController.js for reference
// this is only for controllers functions
//dont wrap the model functions (queries) ,when we await them in controller functions,
//if they reject/give an error, it will be caught by the catchAsync

module.exports = (fn) => {
  return (req, res, next) => {
    console.log("catchAsync for", fn.name);
    fn(req, res, next).catch(next);
  };
};
