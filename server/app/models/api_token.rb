class ApiToken < ApplicationRecord
  belongs_to :user

  NEW_KEY_LENGTH = 32

  def initialize(*args)
    super
    attrs = args.first
    raise ArgumentError, "`expires_at` attribute is required" if !attrs.present? || !attrs.key?(:expires_at)
    self.key ||= generate_key
  end

  def expired?
    expires_at.present? && (expires_at <= Time.zone.now)
  end

  def authenticated_user
    expired? ? nil : self.user
  end

  private

  def generate_key
    SecureRandom.base64(NEW_KEY_LENGTH)
  end
end
