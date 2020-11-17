import { UserFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('AuthController - Login', () => {
  test('should login with right credentials ', async (assert) => {
    const sessionPayload = {
      password: 'secret',
    }
    const user = await UserFactory.merge({ ...sessionPayload }).create()

    const result = await supertest(BASE_URL)
      .post('/login')
      .send({
        email: user.email,
        ...sessionPayload,
      })
      .set('Accept', 'application/json')
      .expect(200)
    assert.exists(result.body)
    assert.exists(result.body.token)
  })

  test('should not login with wrong credentials ', async (assert) => {
    const sessionPayload = {
      password: 'secret',
    }

    const user = await UserFactory.create()

    const result = await supertest(BASE_URL)
      .post('/login')
      .send({
        email: user.email,
        ...sessionPayload,
      })
      .set('Accept', 'application/json')
      .expect(400)

    assert.exists(result.body)
    assert.exists(result.body.errors)
    assert.equal(result.body.errors[0].message, 'Invalid user credentials')
  })
})
