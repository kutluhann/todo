import { SignJWT, jwtVerify } from "jose"

const encodeKey = (key) => {
  return new TextEncoder().encode(key)
}

export const generateJWT = async (payload, expiresIn) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encodeKey(process.env.JWT_SECRET))
}

export const decodeJWT = async (token) => {
  try {
    const { payload } = await jwtVerify(token, encodeKey(process.env.JWT_SECRET), {
      algorithms: ["HS256"]
    })

    return payload
  } catch (err) {
    return null
  }
}

export const checkToken = async (token) => {
  if (!token) return false;

  const parsedToken = await decodeJWT(token)

  if (!parsedToken) return false;

  return true
}