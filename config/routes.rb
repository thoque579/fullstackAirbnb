Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/login' => 'static_pages#login'
  get '/host' => 'static_pages#host'
  get '/property/:id' => 'static_pages#property'
  get '/hostMain' => 'static_pages#hostMain'
  get '/indexProperties' => 'static_pages#indexProperties'
  get '/editProperty/:id' => 'static_pages#edit'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
     resources :properties, only: [:index, :show, :create, :delete, :update, :userProperties]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
    #properties
    # get '/properties' => 'properties#index'
      get '/properties/:id' => 'properties#show'
      post '/properties/create' => 'properties#create'
    # delete '/properties/delete' => 'properties#delete'
    # put '/properties/update' => 'properties#update'
    # get '/properties/userProperties' => 'properties#userProperties'
    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'

    get '/properties_index/userProperties' => 'properties_index#userProperties'
    put '/properties_index/edit' => 'properties_index#edit'

  end

end
