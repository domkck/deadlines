require 'json'
require 'time'

require 'sinatra'
require 'ripple'

class ModuleModel # Cause calling it Module fucks up the whole of Ruby
  include Ripple::Document
  property :name, String
  property :code, String

  many :deadlines, :class_name => "Deadline"
end

class Deadline
  include Ripple::Document
  property :name, String
  property :due, Time

  one :module, :class_name => "ModuleModel"
end

configure do
  Ripple.load_config('./config/ripple.yml', ['development'])
end

get '/deadlines' do
  content_type "application/json"
  deadlines = []
  Deadline.all.each do |deadline|
    deadlines << deadline.serializable_hash.merge({ :module => deadline.module.serializable_hash })
  end
  deadlines.to_json
end

get '/deadlines/:id' do
  content_type "application/json"
  deadline = Deadline.find(params['id'])
  if deadline.nil?
    raise Sinatra::NotFoundError
  else
    deadline.serializable_hash.merge({ :module => deadline.module.serializable_hash }).to_json
  end
end

post '/deadlines' do
  content_type "application/json"

  params = JSON.parse(request.body.read)
  unless params['name'] and params['due'] and params['module']
    halt ({ :error => 'Must specify deadline name, due date and module' }).to_json
  end

  deadline = Deadline.new
  mod = ModuleModel.find(params['module'])
  deadline.name = params['name']
  deadline.due = Time.parse(params['due'])
  deadline.module = mod
  deadline.save
  mod.deadlines << deadline
  mod.save
  deadline.to_json
end

get '/modules' do
  content_type "application/json"

  mods = []
  ModuleModel.all.each do |mod|
    mods << mod.serializable_hash.merge({ :deadlines => mod.deadlines })
  end
  mods.to_json
end

get '/modules/:id' do
  content_type "application/json"
  mod = ModuleModel.find(params['id'])
  if mod.nil?
    raise Sinatra::NotFound
  else
    mod.to_json
  end
end

post '/modules' do
  content_type "application/json"

  params = JSON.parse(request.body.read)
  unless params['name'] or params['code']
    halt ({ :error => 'Must specify module name or code' }).to_json
  end

  mod = ModuleModel.new
  mod.name = params['name'] if params['name']
  mod.code = params['code'] if params['code']
  mod.save
  mod.to_json
end

delete '/modules/:id' do
  ModuleModel.find(params['id']).destroy
  "OK"
end

not_found do
  'Not found'
end
