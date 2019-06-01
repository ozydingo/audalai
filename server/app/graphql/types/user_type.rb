module Types
  class UserType < Types::Base::BaseObject
    description "An Audalai user"
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
  end
end
