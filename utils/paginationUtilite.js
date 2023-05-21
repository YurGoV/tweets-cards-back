const { User } = require('../db/usersModel');

const paginationData = async (page = 1) => {
  const totalUsers = await User.countDocuments({});

  const limit = 3;

  const lastPage = Math.ceil(totalUsers / limit);
  const currentPage = page > lastPage ? lastPage : page;

  let skip = 0;

  if (currentPage > 1) {
    skip = (currentPage - 1) * limit;
  }

  const pagination = {
    totalUsers,
    currentPage,
    pages: lastPage,
    skip,
    limit,
  };

  return pagination;
};

module.exports = { paginationData };
