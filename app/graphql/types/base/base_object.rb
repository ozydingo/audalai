module Types::Base
  class BaseObject < GraphQL::Schema::Object
    def authenticated?
      current_user.present?
    end

    def auth_expired?
      expired_user.present?
    end

    def authenticate!
      raise GraphQL::ExecutionError, "Authentication expired" if auth_expired?
      raise GraphQL::ExecutionError, "Not authenticated" if !authenticated?
    end

    def current_user
      context[:current_user]
    end

    def expired_user
      context[:expired_user]
    end
  end
end
