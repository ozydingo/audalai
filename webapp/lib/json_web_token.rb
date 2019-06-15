module JsonWebToken
  class << self
    def encode(payload, exp: 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end

    # If validate, raises JWT::ExpiredSignature if expired
    def decode(token, validate: true)
      body = JWT.decode(token, Rails.application.secrets.secret_key_base, validate)[0]
      HashWithIndifferentAccess.new(body)
    end
  end
end
