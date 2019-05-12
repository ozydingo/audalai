module Types
  class UserType < Types::BaseObject
    description "An Audalai user"
    field :id, ID, null: false
    field :name, String, null: true
  end
end
