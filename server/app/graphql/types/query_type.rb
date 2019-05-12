module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :user, UserType, null: true do
      description "An Audalai user"
      argument :id, ID, required: true
    end

    field :users, [UserType], null: false

    field :audio, AudioType, null: true do
      argument :id, ID, required: true
    end

    field :audios, [AudioType], null: false

    def user(id:)
      User.find(id)
    end

    def users
      User.all
    end

    def audio(id:)
      Audio.find(id)
    end

    def audios
      Audio.all
    end
  end
end
