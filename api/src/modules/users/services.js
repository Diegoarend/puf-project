export const decodeBasicToken = basicToken => {
  const [type, credentials] = basicToken.split(' ')

  if (type !== 'Basic') {
    throw new Error('Wrong token type')
  }

  const decoded = Buffer.from(credentials, 'base64').toString()
  const encoded = Buffer.from(decoded, 'utf8').toString('base64')

  if (encoded !== credentials) {
    throw new Error('Wrong credentials is not correct encoded')
  }

  if (decoded.indexOf(':') === -1) {
    throw new Error('Wrong credentials format')
  }

  return decoded.split(':')
}
