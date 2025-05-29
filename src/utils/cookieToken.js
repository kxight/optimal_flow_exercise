const cookieToken = (user, res) => {
    const token = user.getJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

     // remove password from user object
      const { passwordHash, ...userWithoutPassword } = user;

      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user: userWithoutPassword,
      });
  };
  
  module.exports = cookieToken;