import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('AuthController - Register', () => {
  test('should create a new user with the right data', async (assert) => {
    const result = await supertest(BASE_URL)
      .post('/register')
      .send({
        email: 'vini@nodejs.com',
        password: 'secret',
        password_confirmation: 'secret',
      })
      .set('Accept', 'application/json')
      .expect(201)

    assert.exists(result.body)
    assert.exists(result.body.external_id)
    assert.equal(result.body.email, 'vini@nodejs.com')
  })

  test('should not create a new user with an exist email ', async (assert) => {
    const result = await supertest(BASE_URL)
      .post('/register')
      .send({
        email: 'vini@nodejs.com',
        password: 'secret',
        password_confirmation: 'secret',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.exists(result.body)
    assert.equal(result.body.errors[0].rule, 'unique')
    assert.equal(result.body.errors[0].field, 'email')
    assert.equal(result.body.errors[0].message, 'unique validation failure')
  })

  test('should not create a new user without a password ', async (assert) => {
    const result = await supertest(BASE_URL)
      .post('/register')
      .send({
        email: 'vini-2@nodejs.com',
      })
      .set('Accept', 'application/json')
      .expect(422)

    assert.exists(result.body)
    assert.equal(result.body.errors[0].rule, 'required')
    assert.equal(result.body.errors[0].field, 'password')
    assert.equal(result.body.errors[0].message, 'required validation failed')
  })

  test('should not create a new user without a confirmation password ', async (assert) => {
    const result = await supertest(BASE_URL)
      .post('/register')
      .send({
        email: 'vini-2@nodejs.com',
        password: 'secret',
      })
      .set('Accept', 'application/json')
      .expect(422)

    assert.exists(result.body)
    assert.equal(result.body.errors[0].rule, 'confirmed')
    assert.equal(result.body.errors[0].field, 'password_confirmation')
    assert.equal(result.body.errors[0].message, 'confirmed validation failed')
  })
})
