import jwt from "jsonwebtoken";

const authenticateRequest = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "expensetrackermyfirstnodeapp");

    if (!decodedToken) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    req.userId = decodedToken.userId;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default authenticateRequest;
