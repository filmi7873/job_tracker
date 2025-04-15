class CreateJobs < ActiveRecord::Migration[7.1]
  def change
    create_table :jobs do |t|
      t.string :title
      t.string :company
      t.string :status
      t.date :applied_on

      t.timestamps
    end
  end
end
