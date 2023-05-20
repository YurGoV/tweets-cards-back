const { User } = require('../db/usersModel');
const { catchAsyncWrapper } = require('../utils');

const updateUserController = catchAsyncWrapper(async (req, res, next) => {
  const { userId } = req.params;
  const { followed } = req.body;

  const user = await User.findById(userId);

  if (!user){
    return res.status(404).json({
      message: 'there no user in db'
    });}

  if (user.followed === followed){
    return res.status(400).json({
      message: 'there are nothing to update'
    });
  }

  const followers = followed === true ? user.followers + 1 : user.followers - 1;

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { followers, followed },
    { new: true }
  );

  res.status(201).json({
    updatedUser,
  });
});

module.exports = { updateUserController };
