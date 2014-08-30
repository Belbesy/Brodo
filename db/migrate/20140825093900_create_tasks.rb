class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.date :due
      t.integer :state
      t.belongs_to :story, index: true

      t.timestamps
    end
  end
end
