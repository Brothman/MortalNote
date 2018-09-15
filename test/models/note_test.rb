# == Schema Information
#
# Table name: notes
#
#  id            :bigint(8)        not null, primary key
#  title         :string           not null
#  content       :string           not null
#  content_plain :string           not null
#  user_id       :integer          not null
#  notebook_id   :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class NoteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
