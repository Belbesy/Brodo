class AddAttachmentAvatarToStories < ActiveRecord::Migration
  def self.up
    change_table :stories do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :stories, :avatar
  end
end
