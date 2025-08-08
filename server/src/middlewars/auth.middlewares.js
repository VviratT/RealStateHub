import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'

const verifyJWT = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.accessToken

  if (!token) {
    const authHeader = req.headers?.authorization || req.headers?.['x-access-token'] || req.headers?.['X-Access-Token']
    if (authHeader && typeof authHeader === 'string') {
      if (authHeader.startsWith('Bearer ')) token = authHeader.slice(7)
      else token = authHeader
    }
  }

  if (!token) {
    throw new ApiError(403, 'UnAuthorized Access')
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30')
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired access token')
  }

  const userId = decodedToken?._id || decodedToken?.id || decodedToken?.userId
  if (!userId) throw new ApiError(401, 'Invalid token payload')

  const user = await User.findById(userId).select('-password -refreshToken')
  if (!user) throw new ApiError(400, 'Invalid Access Token')

  req.user = user
  next()
})

export { verifyJWT }
