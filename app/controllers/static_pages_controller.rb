class StaticPagesController < ApplicationController
    def home
      render 'home'
    end

    def login
      render 'login'
    end

    def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

end
