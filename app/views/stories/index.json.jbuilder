json.array!(@stories) do |story|
  json.extract! story, :id, :title, :image_url, :file_url, :description, :project_id
  json.url story_url(story, format: :json)
end
