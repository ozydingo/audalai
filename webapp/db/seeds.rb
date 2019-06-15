User.create!(
  name: "Andrew Schwartz",
  nickname: "Andrew",
  email: "schwartz.andrew.h@gmail.com",
  password: SecureRandom.alphanumeric(12),
)

guest = User.create!(
  name: "Guest User",
  nickname: "Guest",
  email: "guest@audalai.com",
  password: SecureRandom.alphanumeric(12),
)

guest.audios.create!(
  name: "foo.wav",
  cloud_file: CloudFile.new,
)

guest.audios.create!(
  name: "bar.mp3",
  cloud_file: CloudFile.new,
)
