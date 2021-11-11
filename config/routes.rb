Rails.application.routes.draw do
  root to: 'static_pages#home'
    get '/login' => 'static_pages#login'
    get '/property/:id' => 'static_pages#property'
  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:create, :index, :show]
    resources :bookings, only: [:create]
    get '/authenticated' => 'sessions#authenticated'



  end

end
