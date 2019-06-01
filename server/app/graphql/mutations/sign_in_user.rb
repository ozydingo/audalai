module Mutations
  class SignInUser < BaseMutation
    null true

    argument :login, Types::Inputs::LoginCredentials, required: false

    field :token, String, null: true
    field :user, Types::UserType, null:true

    def resolve(login: nil)
      login.present? or return nil
      user = User.find_by(email: login[:email]) or return nil
      user.authenticate(login[:password]) or return nil

      token = Authenticator.new.generate_token(login[:email], login[:password])
      context[:session][:token] = token

      return {
        user: user,
        token: token,
      }
    end
  end
end
