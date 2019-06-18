require 'test_helper'

class Mutations::SignInUserTest < ActiveSupport::TestCase
  def new_mutation
    Mutations::SignInUser.new(object: nil, context: { session: {} })
  end

  def create_user
    User.create!(
      name: 'Test User',
      email: 'email@example.com',
      password: '[omitted]',
    )
  end

  test 'success' do
    user = create_user
    mutation = new_mutation

    result = mutation.resolve(
      login: {
        email: user.email,
        password: user.password
      }
    )

    assert result[:token].present?
    assert_equal result[:user], user
    assert_equal mutation.context[:session][:token], result[:token]
  end

  test 'failure because no credentials' do
    assert_nil new_mutation.resolve
  end

  test 'failure because wrong email' do
    create_user
    assert_nil new_mutation.resolve(login: { email: 'wrong' })
  end

  test 'failure because wrong password' do
    user = create_user
    assert_nil new_mutation.resolve(login: { email: user.email, password: 'wrong' })
  end
end
