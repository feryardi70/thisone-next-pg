import jwt from "jsonwebtoken";

export function generateToken(payload) {
  // Replace with your secret from environment variables
  const secretKey = process.env.ADD_TOKEN;

  // Define the token options, e.g., expiration time
  const options = {
    expiresIn: "1200",
  };

  // Sign and return the token
  const token = jwt.sign(payload, secretKey, options);
  return token;
}
