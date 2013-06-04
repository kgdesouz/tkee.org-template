def menu_item(text, target, attributes={})
    # Find path
    path = target.is_a?(String) ? target : target.path
    
    if target == "/projects/"
    	   if @item_rep && @item_rep.path == path
				"<li class=\"dropdown active\" id=\"menu1\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#menu1\">Projects<b class=\"caret\"></b></a>" +
					"<ul class=\"dropdown-menu\">" +
						"<li><a href=\"/projects/\"><i class=\"icon-ok-sign\"></i> Project 1</a></li>" +
						"<li><a href=\" \"><i class=\"icon-tasks\"></i> Project 2</a></li>" +
					"</ul>" +
				"</li>"
	        else
				"<li class=\"dropdown\" id=\"menu1\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#menu1\">Projects<b class=\"caret\"></b></a>" +
					"<ul class=\"dropdown-menu\">" +
						"<li><a href=\"/projects/\"><i class=\"icon-ok-sign\"></i> Project 1</a></li>" +
						"<li><a href=\" \"><i class=\"icon-tasks\"></i> Project 2</a></li>" +
					"</ul>" +
				"</li>"
			end
    elsif @item_rep && @item_rep.path == path
        # Create message
        "<li class=\"active\"><a href=\"#{target}\">#{text}</a></li>"
    else
        "<li><a href=\"#{target}\">#{text}</a></li>" 
    end

# since I'm controlling what the dropdown looks like from here, I can put really anything into this bar.. and control how projects should look like.
end