require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @user = users(:one)
  end

  test "audios are created with write access" do
    audio = @user.audios.create!(cloud_file: CloudFile.new)
    re_audio = Audio.find(audio.id)

    assert_includes(re_audio.writers, @user)
  end
end
