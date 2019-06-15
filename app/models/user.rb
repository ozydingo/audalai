class User < ApplicationRecord
  has_secure_password
  has_and_belongs_to_many :audios, join_table: "audio_read_accesses"

  validates :email, presence: true, uniqueness: true

  GUEST_EMAIL = "guest@audalai.com"

  def self.guest
    find_by(email: GUEST_EMAIL)
  end

  def guest?
    email == GUEST_EMAIL
  end

  # Override audios association method to ensure that
  # creationg comes with write permission by default.
  def audios
    super.create_with(writers: [self])
  end
end
