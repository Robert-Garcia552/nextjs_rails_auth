class SessionsController < ApplicationController
  def create
    @user = user

    if @user&.password == params[:session][:password]
      render json: { 
        success: true 
        }, 
        status: 200
    else
      render json: {
        error: true, 
        error_msg: 'Incorrect username, email or password. Account may also need to be registered.'
      },
      status: 400
    end
  end

  private

  def session_params
    params.require(:session).
      permit(
        :email_or_username,
        :password      
      )
  end

  def email_or_username
    params[:session][:email_or_username]
  end

  def user
    User.where(email: email_or_username).or(User.where(username: email_or_username)).first
  end
end
