class Authenticator
  def get_user(http_headers = {})
    token = decode_token(http_headers) or raise AuthenticationError, "Invalid authentication token"
    User.find(token[:user_id])
  end

  def generate_token(email, password)
    user = User.find_by(email: email) or raise AuthenticationError, "Invalid credentials"
    user.authenticate(password) or raise AuthenticationError, "Invalid credentials"
    return JsonWebToken.encode({user_id: user.id})
  end

  private

  def decode_token(headers)
    JsonWebToken.decode(http_auth(headers))
  end

  def http_auth(headers)
    if headers['Authorization'].blank?
      raise AuthenticationError, "Missing authorization header"
    end

    return headers['Authorization'].split(' ').last
  end
end
