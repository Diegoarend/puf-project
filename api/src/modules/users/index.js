import { prisma } from '~/data'

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


