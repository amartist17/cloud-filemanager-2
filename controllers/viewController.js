exports.home = catchAsync(async (req, res, next) => {
    let singers = await Singer.find({ active: true });
    res.status(200).render("index", { singers });
  });