module Types::Base
  class BaseObject < GraphQL::Schema::Object
    def authenticated?
      current_user.present?
    end

    def authenticate!
      raise GraphQL::ExecutionError, "Not authenticated" if !authenticated?
    end

    def current_user
      context[:current_user]
    end
  end
end
