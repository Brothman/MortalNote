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

require 'test_helper'

class NoteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
