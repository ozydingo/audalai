module Mutations
  class CreateUser < BaseMutation
    argument :name, String, required: true
    argument :login_credentials, Types::Inputs::LoginCredentials, required: false

    type Types::UserType

    def resolve(name: nil, login_credentials: nil)
      User.create!(
        name: name,
        email: login_credentials && login_credentials[:email],
        password: login_credentials && login_credentials[:password],
      )
    end
  end
end
