module Types
  class AudioType < Types::BaseObject
    description "An audio file"
    field :id, ID, null: false
    field :ms, Integer, null: true
    field :name, String, null: true
  end
end
