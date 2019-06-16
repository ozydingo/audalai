require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Audalai
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.assets.enabled = false

    config.autoload_paths << Rails.root.join('lib')

    if File.exists?("#{Rails.root}/config/secrets.yml")
      secrets = YAML.load(File.read("#{Rails.root}/config/secrets.yml"))
      Rails.application.secrets.merge!(secrets["global"].symbolize_keys)
      if secrets.key?(Rails.env)
        Rails.application.secrets.merge!(secrets[Rails.env].symbolize_keys)
      end
    end

    config.default_login_expiration = 24.hours

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', headers: :any, methods: [:get, :post, :options]
      end
    end

    config.public_file_server.enabled = true
    config.assets.compile = false

    config.google_cloud.project_id = "audalai"
    config.google_cloud.keyfile = File.join("config", "credentials", "gcloud_service_account_key.json")
  end
end
