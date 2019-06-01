module Mutations
  class SignInUser < BaseMutation
    null true

    argument :email, Types::AuthProviderEmailInput, required: false

    field :token, String, null: true
    field :user, Types::UserType, null:true

    def resolve(email: nil)
      email.present? or return nil
      user = User.find_by(email: email[:email]) or return nil
      user.authenticate(email[:password]) or return nil

      token = Authenticator.new.generate_token(email[:email], email[:password])
      context[:session][:token] = token

      return {
        user: user,
        token: token,
      }
    end
  end
end
