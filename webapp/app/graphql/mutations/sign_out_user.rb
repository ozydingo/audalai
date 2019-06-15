module Mutations
  class SignOutUser < BaseMutation
    null true

    field :message, String, null: false

    # TODO: this isn't really a mutation anymore. But it's nice to log.
    # For now leaving it in as a placeholder for when we store user data
    # server-side
    def resolve
      return {message: "Signed out"}
    end
  end
end
