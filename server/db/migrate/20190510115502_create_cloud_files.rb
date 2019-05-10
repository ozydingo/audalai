class CreateCloudFiles < ActiveRecord::Migration[6.0]
  def change
    create_table :cloud_files do |t|
      t.timestamps

      t.string :storage_type, index: true
      t.string :uri
      t.boolean :deleted, default: false
      t.boolean :cloud_deleted, default: false
    end
  end
end
