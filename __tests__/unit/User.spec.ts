import test from 'japa'
import faker from 'faker'
import User from 'App/Models/User'

test.group('User', () => {
  test('ensure user password gets hashed during save', async (assert) => {
    const user = new User()
    user.email = faker.internet.email()
    user.name = faker.internet.userName()
    user.password = 'secret'
    await user.save()

    assert.notEqual(user.password, 'secret')
  })
})
