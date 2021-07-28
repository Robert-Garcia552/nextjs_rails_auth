class ApplicationController < ActionController::API
  def authenticate
    if current_user.present?
      render json: { 
        id: current_user.id, 
        username: current_user.username, 
        email: current_user.email 
      },
      status: 200
    else
      render json: {
        error: true,
        error_msg: "Unauthorized"
      },
      status: 401
    end
  end

  private

  def current_user
    params[:session_id] ? User.find(params[:session_id]) : ''
  end
end
