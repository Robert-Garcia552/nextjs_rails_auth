class User < ApplicationRecord
  include BCrypt

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true
  validates_confirmation_of :password,  message: "Password and password confirmation should match."

  def password
    @password ||= Password.new(password_digest)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_digest = @password
  end
end
