#!/bin/bash

x=0
find . -name "[0-9][0-9]*.png" | sort -u | \
while read f; do
  x=`expr $x + 1`
  mv $f ManualAsstermo215Combustao_$x.png
done
