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
    if params["user_id"].to_i == decode_token
      User.find_by(id: decode_token) || ''
    end    
  end

  def generate_token(user_id)
    payload = { id: user_id }
    JWT.encode(payload, ENV.fetch("SECRET_KEY"), 'none')
  end

  def decode_token
    begin
      token = request.headers[:Authentication]
      decoded_array = JWT.decode(token, ENV.fetch("SECRET_KEY"), true, { algorithm: 'none' })
      decoded_array.first["id"]
    rescue JWT::DecodeError
      ''      
    end
  end
end
