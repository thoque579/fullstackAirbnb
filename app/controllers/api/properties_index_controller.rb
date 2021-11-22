module Api
  class PropertiesIndexController < ApplicationController
    def userProperties
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      current_user = session.user

      begin
        @properties = session.user.properties
        render '/api/properties/userProperties', status: :ok if @properties
        rescue ArgumentError => e
          render json: { error: e.message }, status: :bad_request
      end

    end

    def edit
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      @property =  session.user.properties.find_by(params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !@property

      if @property.update(property_params)
        render 'api/properties/show', status: :created
      else
        render json: { success: false }, status: :bad_request
      end
    end



    private

      def property_params
        params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image)
      end




  end
end
