require 'rails_helper'

describe "Create Session", :type => :request do
  let! (:user) { FactoryBot.create(:user) }

  before do
    post '/sessions/login', params: { session: { "email_or_username": user.username,
      "password": "Testing123" }}
    response_json = JSON.parse(response.body)
    @token = response_json["users"][0]["token"]
  end

  it 'Valid token and user_id param returns status 200' do
    headers = { "Authentication" => @token }
    post '/sessions', params: { user_id: user.id }, headers: headers

    expect(response.status).to eq(200)
  end

  it 'should return json with users info' do
    headers = { "Authentication" => @token }
    post '/sessions', params: { user_id: user.id }, headers: headers
    
    response_json = JSON.parse(response.body)

    expect(JSON.parse(response.body)).to eq({
      "email" => user.email,
      "id" => user.id,
      "username" => user.username
    })
  end

  it 'should fail without token in headers' do
    post '/sessions', params: { user_id: user.id }

    expect(response.status).to eq(401)
  end

  it 'should fail without user_id param' do
    headers = { "Authentication" => @token }
    post '/sessions', headers: headers

    expect(response.status).to eq(401)
  end
end