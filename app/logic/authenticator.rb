class Authenticator
  def read_token(token)
    userdata = decode_token(token)
    user = User.find(userdata[:user_id])

    if expired?(userdata)
      return {
        user: nil,
        expired_user: user
      }
    else
      return {
        user: user
      }
    end
  end

  def generate_token(email, password, exp: Rails.application.config.default_login_expiration.from_now)
    user = User.find_by(email: email) or raise AuthenticationError, "Invalid credentials"
    user.authenticate(password) or raise AuthenticationError, "Invalid credentials"
    return JsonWebToken.encode({user_id: user.id}, exp: exp)
  end

  def generate_guest_token(exp: Rails.application.config.default_login_expiration.from_now)
    user = User.guest
    return JsonWebToken.encode({user_id: user.id}, exp: exp)
  end

  private

  def decode_token(token)
    JsonWebToken.decode(token, validate: false)
  end

  def expired?(userdata)
    userdata["exp"].blank? || Time.zone.now.to_i > userdata["exp"]
  end
end
