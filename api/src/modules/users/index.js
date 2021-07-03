import jwt from 'jsonwebtoken'
import { prisma } from '~/data'

export const login = async (ctx) => {
  try {
    const { email, password } = ctx.request.body
    const [user] = await prisma.user.findMany({
      where: { email, password }
    })


    if (!user || password !== user.password) {
      ctx.status = 404
      return
    }
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET)
    ctx.body = { user, token }
  } catch (error) {
    ctx.status = 500
    ctx.body = 'algo deu errado'
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

export const create = async (ctx, next) => {
  try {
    const user = await prisma.user.create({
      data: ctx.request.body
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


