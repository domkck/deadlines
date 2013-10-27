require 'twilio-ruby'

def send_text(to_number, task, due)
  account_sid = "AC89b901f44dc14f98bbab43e4cb19f848"
  auth_token = "f366eec67852a7d09a15d36f890029f7"
  client = Twilio::REST::Client.new account_sid, auth_token
  from = "+441323702003"

  client.account.sms.messages.create(
    :from => from,
    :to => to_number,
    :body => "Hey, just to remind you, #{task} is due #{due}"
  )
  puts "Text sent!"
end