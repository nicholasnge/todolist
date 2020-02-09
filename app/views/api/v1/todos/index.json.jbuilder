json.todos_impt @todos_impt, :id, :content, :priority, :details, :all_tags
json.todos_meh @todos_meh, :id, :content, :priority, :details, :all_tags
json.todos_completed @completed, :id, :content, :details, :all_tags
