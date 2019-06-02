require 'test_helper'

class AuthenticatorTest < ActiveSupport::TestCase
  def create_user
    User.create(
      name: "bob",
      email: "example@example.com",
      password: "secret",
    )
  end

  def create_valid_token(user)
    Authenticator.new.generate_token(user.email, user.password)
  end

  def create_expired_token(user)
    Authenticator.new.generate_token(user.email, user.password, exp: 1.hour.ago)
  end

  test 'get user from valid token' do
    user = create_user
    token = create_valid_token(user)
    userdata = Authenticator.new.read_token(token)

    assert_equal(userdata[:user], user)
  end

  test 'get user from expired token' do
    user = create_user
    token = create_expired_token(user)
    userdata = Authenticator.new.read_token(token)

    assert_nil(userdata[:user])
    assert_equal(userdata[:expired_user], user)
  end

  test 'does not generate a token with invalid credentials' do
    user = create_user
    assert_raise(AuthenticationError) do
      Authenticator.new.generate_token(user.email, 'not_my_password')
    end
  end

  test 'does not generate a token with invalid user' do
    assert_raise(AuthenticationError) do
      Authenticator.new.generate_token('', '')
    end
  end
end
