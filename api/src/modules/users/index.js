import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '~/data'

import { decodeBasicToken} from './services'

const errorTypes= {
  TokenTypeError: 400,
  BadCredentialsError:400,
  EncodedError:400


}

export const login = async (ctx) => {
  try {
    const [email, password] = decodeBasicToken(ctx.request.headers.authorization)
  } catch (error) {
    ctx.status = 400
    console.log(error)
    return
  }

  try {

    const user = await prisma.user.findUnique({
      where: { email }
    })

    const passwordEqual = await bcrypt.compare(password, user.password)


    if (!user || !passwordEqual) {
      ctx.status = 404
      return
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET)
    ctx.body = { user, token }
  } catch (error) {
    if (error.custom) {
      ctx.status=400
      return
    }
    ctx.status = 500
    ctx.body = 'algo deu errado'
    console.log(error)
    return null
  }
}

export const list = async (ctx) => {
  try {
    const users = await prisma.user.findMany()
    ctx.body = users
  } catch (error) {
    ctx.status = 500
    ctx.body = 'algo deu errado'
    return null

  }
  //ctx.body = 'hello usesrs'
}

export const create = async (ctx) => {
  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(ctx.request.body.password, saltRounds)

    const user = await prisma.user.create({
      data: {
        name: ctx.request.body.name,
        email: ctx.request.body.email,
        password: hashedPassword,
      }
    })

    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = 'algo deu errado'
    return null

  }
}

export const update = async (ctx, next) => {
  const { name, email } = ctx.request.body


  try {
    const user = await prisma.user.update({
      where: { id: ctx.params.id },
      data: { name, email },
    })
    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = 'algo deu errado'
    return null

  }
}

export const remove = async (ctx, next) => {
  try {
    const user = await prisma.user.delete({
      where: { id: ctx.params.id },
    })
    ctx.body = { id: ctx.params.id }
  } catch (error) {
    ctx.status = 500
    ctx.body = 'algo deu errado'
    return null

  }
}


