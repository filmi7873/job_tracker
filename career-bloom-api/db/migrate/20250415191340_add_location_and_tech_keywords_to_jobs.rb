class AddLocationAndTechKeywordsToJobs < ActiveRecord::Migration[7.1]
  def change
    add_column :jobs, :location, :string
    add_column :jobs, :tech_keywords, :text
  end
end
