import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  const token = req.cookies.token || "";

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default isAuth;
