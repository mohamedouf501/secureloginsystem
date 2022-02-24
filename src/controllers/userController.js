const APIFeatures = require("../../util/APIfeatures");
const User = require("../models/userModel");
const catchAsync = require("../../util/catchAsync");
const AppError = require("../../util/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;
  res.status(200).json({ status: "success", count: users.length, data: users });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError(`No user with the id of ${req.params.id}`, 404));
  }
  res.status(200).json({ status: "success", data: user });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(
      new AppError(
        "This route is not for password update. Please use /updateMyPassword",
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, "name", "email");
  await User.findByIdAndUpdate(req.user.id, filteredBody);
  res.status(200).json({ status: "success" });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({ status: "success", data: null });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError(`No user with the id of ${req.params.id}`, 404));
  }
  await User.findByIdAndUpdate(req.params.id, { active: false });
  res.status(200).json({ status: "success", data: null });
});

exports.AddAdmin = catchAsync(async (req, res, next) => { 
  const user = await User.findById(req.params.id);
  console.log(user);
  if (!user) {
    return next(new AppError(`No user with the id of ${req.params.id}`, 404));
  }
  user.role = "admin";
  await user.save();
  res.status(200).json({ status: "success", data: user });

});