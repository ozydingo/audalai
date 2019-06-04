module Mutations
  class SignInGuest < BaseMutation
    null false

    field :token, String, null: false
    field :user, Types::SelfType, null: false

    def resolve(login: nil)
      token = Authenticator.new.generate_guest_token
      context[:session][:token] = token

      return {
        user: User.guest,
        token: token,
      }
    rescue AuthenticationError
      raise GraphQL::ExecutionError, $!.message
    end
  end
end
