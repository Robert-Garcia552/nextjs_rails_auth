FactoryBot.define do

  factory :user, class: User do
    username { Faker::Internet.username(specifier: 5..8) }
    email { Faker::Internet.email }
    password { 'Testing123' }
    password_confirmation { password }
  end
end