const { User } = require('../db/usersModel');
const { catchAsyncWrapper, paginationData } = require('../utils');

const getUsers = async ({ skip, limit }) => {
  const result = await User.find({})
    .sort({ title: 1 })
    .skip(skip)
    .limit(limit)
    .sort({ followers: -1 });
  return result;
};

const getUsersController = catchAsyncWrapper(async (req, res) => {
  const { page } = req.params;
  const pagination = await paginationData(page);
  const { totalUsers, currentPage, pages, skip, limit } = pagination;

  const users = await getUsers({ skip, limit });

  res.status(200).json({
    totalUsers,
    currentPage,
    pages,
    users,
  });
});

module.exports = { getUsersController };
