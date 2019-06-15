module Types::Inputs
  class LoginCredentials < BaseInputObject
    argument :email, String, required: true
    argument :password, String, required: true
  end
end
