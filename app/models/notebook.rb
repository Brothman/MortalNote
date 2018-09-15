# == Schema Information
#
# Table name: notebooks
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Notebook < ApplicationRecord
  validates :title, :user_id, presence: true
  #Ensures that each user can only have one notebook with a given title
  validates :title, uniqueness: { scope: :user_id }

  has_many :notes
end
