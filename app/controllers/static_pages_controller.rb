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

    def hostMain
      render 'hostMain'
    end

    def indexProperties
      render 'indexProperties'
    end

    def edit
       @data = { property_id: params[:id] }.to_json
      render 'edit'
    end

    def bookingList
      render 'bookingsList'
    end

    def success
      @data = { property_id: params[:id]}.to_json
      render 'success'
    end

end
