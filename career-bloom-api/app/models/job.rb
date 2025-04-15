class Job < ApplicationRecord
  serialize :tech_keywords, coder: JSON
end
