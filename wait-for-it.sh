#!/bin/bash
#   Use the wait-for-it.sh script to ensure that the MySQL service is available before starting the application.
#   This script waits until a given host and port are available before executing another command.

set -e

host="$1"
port="$2"
cmd="$3"
timeout=30

# Function to display usage information
usage() {
    echo "Usage: wait-for-it.sh host:port [-- command args]"
    echo ""
    echo "    - host:port: the host and port to wait for"
    echo "    - command: the command to execute after the host and port are available"
    echo "    - args: optional arguments to pass to the command"
}

# Check if the required parameters are provided
if [ -z "$host" ] || [ -z "$port" ]; then
    echo "Error: Missing host and/or port."
    usage
    exit 1
fi

# Function to wait for the host and port to become available
wait_for() {
    for i in $(seq "$timeout"); do
        # Try to connect to the host and port
        if nc -z "$host" "$port"; then
            # If successful, execute the command
            exec ${cmd+"$@"}
            exit 0
        fi
        # Wait for 1 second before trying again
        sleep 1
    done
    # If the timeout is reached, display an error message and exit with an error code
    echo "Error: Timeout waiting for $host:$port"
    exit 1
}

# If no command is provided, display an error message and exit
if [ -z "$cmd" ]; then
    echo "Error: Missing command."
    usage
    exit 1
fi

# Check if the command is specified after the double dash "--"
if [ "$cmd" = "--" ]; then
    echo "Error: Missing command."
    usage
    exit 1
fi

# Call the wait_for function to wait for the host and port
wait_for "$host" "$port" "$cmd"
