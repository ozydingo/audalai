module Types
  class MutationType < Base::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :sign_in_user, mutation: Mutations::SignInUser
    field :sign_out_user, mutation: Mutations::SignOutUser
    field :sign_in_guest, mutation: Mutations::SignInGuest
  end
end
