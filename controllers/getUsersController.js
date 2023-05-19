const { User } = require('../db/usersModel');
const { catchAsyncWrapper, paginationData } = require('../utils');

// const getUsers = async (skip, limit) => {
const getUsers = async ({ skip, limit }) => {
  const result = await User.find({})
    .sort({ title: 1 })
    .skip(skip)
    .limit(limit)
    .sort({ followers: -1 });
  // const result = await User.find({}).sort({ followers: 1 });
  return result;
};

const getUsersController = catchAsyncWrapper(async (req, res) => {
  const { page } = req.params;
  const pagination = await paginationData(page);
  console.log('CL: ~ file: getUsersController.js:18 ~ pagination:', pagination);
  const { totalUsers, currentPage, pages, skip, limit } = pagination;

  const users = await getUsers({ skip, limit });

  //   res.status(200).json({
  //     totalFavorites,
  //     returnedPage,
  //     favoriteRecipes,
  //   });
  // console.log(
  //   '~totalUsers, currentPage, skip, limit getUsersController.js [33]:',
  //   totalUsers,
  //   currentPage,
  //   pages,
  //   skip,
  //   limit
  // );

  res.status(200).json({
    totalUsers,
    currentPage,
    pages,
    users,
  });
});

module.exports = { getUsersController };
