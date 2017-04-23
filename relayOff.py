#!/usr/bin/python
import RPi.GPIO as GPIO
import sys

GPIO.setmode(GPIO.BCM)


try:
  GPIO.setup(int(sys.argv[1]), GPIO.OUT) 
  GPIO.output(int(sys.argv[1]), GPIO.LOW)

# End program cleanly with keyboard
except KeyboardInterrupt:
  print "  Quit"

  # Reset GPIO settings
  GPIO.cleanup()


# find more information on this script at
# http://youtu.be/WpM1aq4B8-A