require 'test_helper'

class AuthenticatorTest < ActiveSupport::TestCase

  test 'token_round_trip' do
    password = "secret"
    user = User.create(
      name: "bob",
      email: "example@example.com",
      password: password,
    )
    token = Authenticator.new.generate_token(user.email, password)
    token_user = Authenticator.new.get_user(token)

    assert_equal(user, token_user)
  end
end
