module Types
  class QueryType < Base::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :user, UserType, null: true do
      description "An Audalai user"
      argument :id, ID, required: true
    end

    field :users, [UserType], null: false

    field :user_count, Integer, null: false

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

    def user_count
      User.count
    end

    def audio(id:)
      context[:current_user].audios.find(id)
    end

    def audios
      context[:current_user].audios
    end

    private

    def current_user
      context[:current_user]
    end
  end
end
