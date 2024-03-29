module Api
  class UsersController < ApplicationController
    def create
    @user = User.new(user_params)

      if @user.save
        render 'api/users/create', status: :created
      else
        render json: {
          success: false,
          errors: @user.errors,  status: :bad_request
         }
      end
    end

    private

    def user_params
      params.require(:user).permit( :username, :email, :password)
    end
  end
end
