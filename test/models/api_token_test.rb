require 'test_helper'

class ApiTokenTest < ActiveSupport::TestCase
  setup do
    @user = users(:one)
    @token = ApiToken.create!(user: @user, expires_at: 1.day.from_now)
  end

  test "tokens are created with valid keys" do
    assert_not_nil(@token.key)
  end

  test "dup keys are prohibited" do
    assert_raises(ActiveRecord::RecordNotUnique) do
      token2 = ApiToken.create!(user: @user, key: @token.key, expires_at: 1.hours.from_now)
    end
  end

  test "it authentiates a user" do
    assert_equal(@token.authenticated_user, @user)
  end

  test "expired tokens don't authenticate" do
    expired_token = ApiToken.create!(user: @user, expires_at: 10.minutes.ago)
    assert_nil(expired_token.authenticated_user)
  end

  test "expires_at param is required" do
    ex = assert_raises(ArgumentError) do
      token = ApiToken.new
    end
    assert_match(/expires_at/, ex.message)

    ex = assert_raises(ArgumentError) do
      token = ApiToken.create!(user: @user)
    end
    assert_match(/expires_at/, ex.message)

    token = ApiToken.create!(user: @user, expires_at: nil)
  end
end
