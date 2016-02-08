=begin
A simple program to exercise the TuringMachine class.

Execution begins at the bottom of the file
=end

require 'json'

=begin
   Cell
   Used as a cell by TuringMachine class
   @value: the value in the cell
   @being_read: a boolean value indicating if the head is at the cell
=end
class Cell
   attr_accessor :value
   attr_accessor :being_read

   def initialize(settings_hash)
      @value = settings_hash[:value]
      @being_read = settings_hash[:being_read]
   end
end

=begin
   TuringMachine
   A class that simulates a Turing machine.

   This class simulates a Turing machine, reading instructions from a
   specified JSON file (See div.json for an example progam of dividing by 2).

   @verbose: boolean value. If set to true the full config history is outputed
      during execution.
   @tape: A hash with the cell position as keys (beginning at 0) and a Cell as
      value. Note that the keys are string representations of integers. This
      allows indexing by "-3" or any negative value for an easy tape implementation.
      Empty cells are denoted with the 'e' character.
   @reading_head: An integer representing the current position of the read/write head.
      This variable may be negative or positive.
   @transition_table: A hash representation of the JSON instructions. Indexing this hash
      by an integer value returns the relevant state info (i.e.
      @transition_table[1] returns the instructions for state 1). Indexing this returned
      value by an integer returns the correct instructions for when the machine reads
      that index on the tape (i.e. @transitino_table[1][0] returns the instructions
      for what the machine should do in state 1 when a 0 is read from the tape).
      See 'div.json' for to see how JSON is formatted.
   @current_state: An integer value indicating the current state of the machine.
   @final_state: An integer value indicating the halt state.
=end
class TuringMachine
   attr_accessor :verbose

   def initialize(initial_tape_value, transition_filename)
      #Machine Tape
      @tape = set_tape(initial_tape_value)

      #Set the default value for keys with no value in the tape hash
      @tape.default = Cell.new({value: "e", being_read: false})

      #start the head at 0
      @reading_head = 0

      #Load the transition table
      @transition_table = load_transitions(transition_filename)

      #set the initial state
      @current_state = 0

      #set the final state
      @final_state = @transition_table.length - 1

      #Do not output complete config history by default
      @verbose = false
   end

   #print out the tape
   def print_tape
      #Get a list of keys sorted by numeric value
      sorted_keys = @tape.keys.map{|x| x.to_i}.sort.map{|x| x.to_s}

      #use the sorted keys to index the tape
      sorted_keys.each do |key|
         print "#{@tape[key].value}|" unless @tape[key].being_read
         print "#{@tape[key].value}*|" if @tape[key].being_read
      end

      puts ""
   end

   #Run the instruction set
   def run
      while @current_state != @final_state do
         #if the reading head is at a new cell, create the cell
         unless @tape.has_key? @reading_head.to_s
            @tape[@reading_head.to_s] = Cell.new({value: "e", being_read: false})
         end

         #set the variable that is being read (for display purposes)
         @tape[@reading_head.to_s].being_read = true

         print_tape

         #get instructions for the current state
         state = @transition_table[@current_state]
         puts "Current state is #{@current_state}" if @verbose

         #read
         read_value = @tape[@reading_head.to_s].value.to_s
         read_value = 2 if read_value == "e"

         state = state[read_value.to_i]

         puts "Just read a(n) #{read_value}" if @verbose

         #write
         @tape[@reading_head.to_s].value = state["write"]

         puts "Just wrote a(n) #{state["write"]}" if @verbose

         #The value is no longer being read
         @tape[@reading_head.to_s].being_read = false

         #move
         if state["direction"] == "R"
            move_right
            puts "Just moved right" if @verbose
         else
            move_left
            puts "just moved left" if @verbose
         end

         #update state
         @current_state = state["next_state"]
         puts "Just updated state to #{@current_state}" if @verbose
         puts "-------------------------------------------" if @verbose
      end
   end

   private

   #set each Cell of the tape to the respective character in "value"
   def set_tape(value)
      tape = Hash.new
      value.split("").each_with_index do |value, i|
         #TODO use Cell here
         tape[i.to_s] = Cell.new({value: value, being_read: false})
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

#BEGIN EXECUTION HERE
#specify initial tape value and instruction file
tm = TuringMachine.new("11001100", "div.json")

#output configuration history
tm.verbose = true

#run the instruction set
tm.run
