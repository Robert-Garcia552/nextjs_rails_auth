class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render json: {
        success: true
      },
      status: 200
    else
      render json: {
        error: true,
        error_msg: @user.errors
      },
      status: 400
    end
  end

  private

  def user_params
    params.require(:user).
      permit(
        :email, 
        :username, 
        :password, 
        :password_confirmation
      )
  end
end
