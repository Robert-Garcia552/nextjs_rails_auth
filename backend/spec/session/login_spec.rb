require 'rails_helper'

describe "Username Login with valid credentials", :type => :request do
  let! (:user) { FactoryBot.create(:user) }

  before do
    post '/sessions/login', params: { session: { "email_or_username": user.username,
    "password": "Testing123" }}
  end

  it 'should return status 200 with valid username and password' do
    expect(response.status).to eq(200)
  end

  it 'should return json with users info' do
    response_json = JSON.parse(response.body)
    token = response_json["users"][0]["token"]

    expect(response_json).to eq({
      "success" => true, 
      "users" => [{"user_id" => user.id, "email" => user.email, "username" => user.username, "token" => token}]
    })
  end
end

describe "Username Login with invalid credentials", :type => :request do
  before do
    post '/sessions/login', params: { session: { "email_or_username": 'random',
    "password": "Testing1234" }}
  end

  it 'should fail with invalid credentials' do
    expect(response.status).to eq(401)
  end
end

describe "Email Login with a single account", :type => :request do
  let! (:user) { FactoryBot.create(:user) }

  before do
    post '/sessions/login', params: { session: { "email_or_username": user.email,
    "password": "Testing123" }}
  end

  it 'should return status 200 with valid email and password for single account' do
    expect(response.status).to eq(200)
  end

  it 'should return json with users info' do
    response_json = JSON.parse(response.body)
    token = response_json["users"][0]["token"]

    expect(response_json).to eq({
      "success" => true, 
      "users" => [{"user_id" => user.id, "email" => user.email, "username" => user.username, "token" => token}]
    })
  end
end

describe "Email Login with multiple accounts", :type => :request do
  let! (:user_one) { FactoryBot.create(:user, email: "test@test.com") }
  let! (:user_two) { FactoryBot.create(:user, email: "test@test.com") }

  before do
    post '/sessions/login', params: { session: { "email_or_username": user_one.email,
    "password": "Testing123" }}
  end

  it 'should return status 200 with valid email and password for multiple accounts' do
    expect(response.status).to eq(200)
  end

  it 'should return json with users info' do
    response_json = JSON.parse(response.body)
    user_one_token = response_json["users"][0]["token"]
    user_two_token = response_json["users"][1]["token"]

    expect(response_json).to eq({
      "success" => true, 
      "users" => [{"user_id" => user_one.id, "email" => user_one.email, "username" => user_one.username, "token" => user_one_token},
        {"user_id" => user_two.id, "email" => user_two.email, "username" => user_two.username, "token" => user_two_token}
      ]
    })
  end
end

describe "Email Login with no accounts", :type => :request do
  before do
    post '/sessions/login', params: { session: { "email_or_username": 'random@test.com',
    "password": "Testing1234" }}
  end

  it 'should fail with invalid credentials' do
    expect(response.status).to eq(401)
  end
end
