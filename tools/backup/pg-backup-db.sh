#!/bin/bash

pg_dump -Fc --clean --no-owner $1 | gzip -c | cat > $2