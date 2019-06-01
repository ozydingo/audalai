module Mutations
  class SignOutUser < BaseMutation
    null true

    field :message, String, null: false

    def resolve
      context[:session].delete(:token)

      return {message: "Signed out"}
    end
  end
end
