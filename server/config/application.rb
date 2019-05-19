require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Audalai
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    if File.exists?("#{Rails.root}/config/secrets.yml")
      secrets = YAML.load(File.read("#{Rails.root}/config/secrets.yml"))
      Rails.application.secrets.merge!(secrets["global"].symbolize_keys)
      if secrets.key?(Rails.env)
        Rails.application.secrets.merge!(secrets[Rails.env].symbolize_keys)
      end
    end

    config.action_dispatch.default_headers = {
      'Access-Control-Allow-Origin' => 'http://audalai.com',
      'Access-Control-Request-Method' => %w{GET POST OPTIONS}.join(",")
    }
  end
end
