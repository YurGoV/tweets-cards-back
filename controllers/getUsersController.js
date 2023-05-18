const { User } = require('../db/usersModel');
const { catchAsyncWrapper } = require('../utils');

// const getUsers = async (skip, limit) => {
const getUsers = async () => {
  //   const result = await Users.find({
  //     _id: favorites,
  //   })
  //     .sort({ title: 1 })
  //     .skip(skip)
  //     .limit(limit);
  const result = await User.find({}).sort({ followers: 1 });
  return result;
};

const getUsersController = catchAsyncWrapper(async (req, res) => {
  const { page = 1 } = req.body;

  //   const paginationData = await favoritesPagination(userId, page);

  //   const { totalFavorites, currentPage, skip, limit } = paginationData;

  //   const returnedPage = Number(currentPage);

  //   const users = await getUsers(skip, limit);

  const users = await getUsers();

  //   res.status(200).json({
  //     totalFavorites,
  //     returnedPage,
  //     favoriteRecipes,
  //   });
  res.status(200).json({
    users,
  });
});

module.exports = { getUsersController };
