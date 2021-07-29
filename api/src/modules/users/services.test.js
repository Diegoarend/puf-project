import { decodeBasicToken, TokenTypeError, EncodedError, BadCredentialsError } from './services'

describe('User services', () => {
  it('should return credentials by basic authentication token', () => {
    //prepare 
    const email = 'diegoaw@codar.me'
    const password = '123456'
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')

    const basicToken = `Basic ${token}`

    //execution
    const result = decodeBasicToken(basicToken)

    //expectation
    expect(result).toEqual([email, password])
  })

  it('should throw new error when token is not Basic type', () => {
    //prepare 
    const email = 'diegoaw@codar.me'
    const password = '123456'
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')

    const basicToken = `Bearer ${token}`

    //execution
    const result = () => decodeBasicToken(basicToken)

    //expectation
    expect(result).toThrowError('Wrong token type')
  })

  it('should throw new error when credentials is not on correct format', () => {
    //prepare 
    const email = 'diegoaw@codar.me'
    const password = '123456'
    const token = Buffer.from(`${email}${password}`, 'utf8').toString('base64')

    const basicToken = `Basic ${token}`

    //execution
    const result = () => decodeBasicToken(basicToken)

    //expectation
    expect(result).toThrowError('Wrong credentials format')
  })


  it('should throw new error when credentials is not base64 encoded', () => {
    //prepare 
    const email = 'diegoaw@codar.me'
    const password = '123456'
    const token = `${email}:${password}`

    const basicToken = `Basic ${token}`

    //execution
    const result = () => decodeBasicToken(basicToken)

    //expectation
    expect(result).toThrowError('Wrong credentials is not correct encoded')
  })
})