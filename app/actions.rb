# Homepage (Root path)
get '/' do
  erb :flickr
end

get '/weather' do
  erb :weather
end

get '/flickr' do
  erb :flickr
end