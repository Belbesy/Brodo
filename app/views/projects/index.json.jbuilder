json.array!(@projects) do |project|
  json.extract! project, :id, :title, :image_url, :description
  json.url project_url(project, format: :json)
end
