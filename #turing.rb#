require 'json'

class TuringMachine
  def initialize(initial_tape_value, transition_filename)
    #Machine Tape
    @tape = set_tape(initial_tape_value)
    @tape.default = "e"
      
    #start the head at 0
    @reading_head = 0

    #Load the transition table
    @transition_table = load_transitions(transition_filename)

    #set the initial state
    @current_state = 0

    #set the final state
    @final_state = @transition_table.length - 1
  end

  #print out the tape
  def print_tape
    puts "Reading Head: #{@reading_head}"
    sorted_keys = @tape.keys.map{|x| x.to_i}.sort.map{|x| x.to_s}
    sorted_keys.each do |key|
      print "#{@tape[key]}|"
    end
    puts ""
  end

  def run
    
    while @current_state != @final_state do
      print_tape
      #get instructions for the current state
      state = @transition_table[@current_state]
      puts "Current state is #{@current_state}"
      
      #read
      read_value = @tape[@reading_head.to_s].to_s
      read_value = 2 if read_value == "e"
      
      state = state[read_value.to_i]
      
      puts "Just read a #{read_value}"
      
      #write
      @tape[@reading_head.to_s] = state["write"].to_i
      puts "Just wrote a #{state["write"]}"
      
      #move
      if state["direction"] == "R"
        move_right
        puts "Just moved right"
      else
        move_left
        puts "just moved left"
      end
      
      #update state
      @current_state = state["next_state"]
      puts "Just updated state to #{@current_state}"
      print_tape
      puts "-------------------------------------------"
    end
  end
  
  private
  
  #set each cell of the tape to the respective character in "value"
  def set_tape(value)
    tape = Hash.new
    value.split("").each_with_index do |value, i|
      tape[i.to_s] = value
    end

    tape
  end

  #read the transition file
  def load_transitions(filename)
    file = File.read(filename)
    JSON.parse(file)
  end

  #move right
  def move_right
    @reading_head += 1
  end

  #move left
  def move_left
    @reading_head -= 1
  end
end

tm = TuringMachine.new("11001", "test_2.json")
tm.run
