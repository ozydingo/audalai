require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Audalai
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    config.autoload_paths << Rails.root.join('lib')

    if File.exists?("#{Rails.root}/config/secrets.yml")
      secrets = YAML.load(File.read("#{Rails.root}/config/secrets.yml"))
      Rails.application.secrets.merge!(secrets["global"].symbolize_keys)
      if secrets.key?(Rails.env)
        Rails.application.secrets.merge!(secrets[Rails.env].symbolize_keys)
      end
    end

    config.default_login_expiration = 24.hours

    config.action_dispatch.default_headers = {
      'Access-Control-Allow-Origin' => 'http://audalai.com',
      'Access-Control-Request-Method' => %w{GET POST OPTIONS}.join(",")
    }
  end
end
