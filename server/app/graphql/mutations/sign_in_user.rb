module Mutations
  class SignInUser < BaseMutation
    null false

    argument :login, Types::Inputs::LoginCredentials, required: true

    field :token, String, null: false
    field :user, Types::SelfType, null: false

    def resolve(login: nil)
      token = Authenticator.new.generate_token(login[:email], login[:password])
      context[:session][:token] = token
      user = User.find_by(email: login[:email])

      return {
        user: user,
        token: token,
      }
    rescue AuthenticationError
      raise GraphQL::ExecutionError, $!.message
    end
  end
end
