# == Schema Information
#
# Table name: notes
#
#  id            :bigint(8)        not null, primary key
#  title         :string
#  content       :string
#  content_plain :string
#  user_id       :integer          not null
#  notebook_id   :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  deleted       :boolean          default(FALSE), not null
#

class Note < ApplicationRecord
  #making the assumption that content and content_plain will both hold an empty string
  #at the beginning (i.e. note.content = "" when empty)
  validates :user_id, :notebook_id, presence: true
  validates :title, :content, :content_plain, presence: true, allow_blank: true
  validates :deleted, inclusion: { in: [ true, false ] }

  belongs_to :notebook

end
