File.open('new_dump.txt', 'w') do |f|
  current_line = ''
  File.foreach('dump.txt').with_index do |line, i|
    puts i
    if line.chomp.end_with?(';')
      f.puts current_line + line.chomp
      current_line = ''
    else
      current_line += line.chomp
    end
  end
end






