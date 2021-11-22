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

      return render json: { error: 'User is not found'}, status: :unauthorized if !session

      begin
        @property = Property.find_by(user.properties.find_by(id: params[:id]))

        return render 'not_found', status: :not_found if !@property
        return render 'bad_request', status: :bad_request if !@property.update(property_params)
        return render '/api/properties/edit', status: :ok

      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end





  end
end
