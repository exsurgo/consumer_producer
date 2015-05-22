#!/bin/sh

dir=$(pwd)
echo "The current working directory $dir."

# Run consumer
osascript -e "tell app \"Terminal\"
    do script \"cd $dir; node app/consumer.js\"
end tell"

# Run concurrent producers (2)
osascript -e "tell app \"Terminal\"
    do script \"cd $dir; node app/producer.js\"
    do script \"cd $dir; node app/producer.js\"
end tell"
