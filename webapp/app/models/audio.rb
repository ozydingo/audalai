class Audio < ApplicationRecord
  has_and_belongs_to_many :readers, class_name: "User", join_table: "audio_read_accesses"
  has_and_belongs_to_many :writers, class_name: "User", join_table: "audio_write_accesses"
  belongs_to :cloud_file
end
