class Authenticator
  def get_user(token)
    User.find(decode_token(token)[:user_id])
  end

  def generate_token(email, password)
    user = User.find_by(email: email) or raise AuthenticationError, "Invalid credentials"
    user.authenticate(password) or raise AuthenticationError, "Invalid credentials"
    return JsonWebToken.encode({user_id: user.id})
  end

  private

  def decode_token(token)
    JsonWebToken.decode(token)
  end
end
