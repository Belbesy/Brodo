class AddStateToStories < ActiveRecord::Migration
  def self.up
    add_column :stories, :state_cd, :integer
  end

  def self.down
    remove_column :stories, :state_cd
  end
end
