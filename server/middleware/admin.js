let admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.send('You ar not allowwed')
  }

  next();
}

module.exports = { admin }