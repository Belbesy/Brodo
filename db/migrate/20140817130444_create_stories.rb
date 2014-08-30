class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title
      t.string :image_url
      t.string :file_url
      t.text :description
      t.belongs_to :project, index: true

      t.timestamps
    end
  end
end
