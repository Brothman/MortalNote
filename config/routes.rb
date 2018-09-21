Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create]
    resource :session, only: [:create, :destroy]

    #Create and destroy for creation and deletion. Show to pass information to
    #The client for Redux and React to store and render. Index to gather all
    #notebooks at once.
    resources :notebooks, only: [:create, :destroy, :show, :index]
    resources :notes, only: [:create, :destroy, :show, :update]
  end

  get 'auth/:provider/callback', to: 'api/sessions#google_create', defaults: { format: :json }
  get "*path", to: "static_pages#root"
end
