#!/bin/bash

message=$(cat "$1" | xargs)

requiredPattern="^(T[0-9]{1,6}|SETUP|Merge|feature|feat): .+"

if ! echo "$message" | grep -qE "$requiredPattern"; then
    echo ""
    echo "Wrong commit message!"
    echo "The commit message must have this format:"
    echo "<TICKET_NUMBER or SETUP>: <what was done>"
    echo ""
    echo "Example:"
    echo "T1234: add login button"
    echo "SETUP: updated node packages"
    echo ""
    exit 1
fi
