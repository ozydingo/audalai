require 'test_helper'

class SessionSControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get login_url
    assert_response :success
  end

  test "should get create" do
    post sessions_url
    assert_response :success
  end

  test "should get destroy" do
    get logout_url
    assert_redirected_to root_url
  end

end
