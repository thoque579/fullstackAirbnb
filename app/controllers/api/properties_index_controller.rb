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

  end
end
