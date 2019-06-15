module Types
  class SelfType < Types::Base::BaseObject
    description "A signed-in user's info"
    field :id, ID, null: false
    field :name, String, null: true
    field :nickname, String, null: true
    field :email, String, null: false
  end
end
