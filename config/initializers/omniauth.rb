require_relative 'api.rb'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, Rails.application.credentials.google[:api_key], Rails.application.credentials.google[:secret_key],
  {
    provider_ignores_state: true
  }
end
