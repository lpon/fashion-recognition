#!/bin/bash

export TEST_OUTPUT="by_designer_test_inaccuracies_test__output.txt"
export PATH_TO_TEST_IMAGES="by_designer_test_inaccuracies/test_images"

rm $TEST_OUTPUT

for filename in $PATH_TO_TEST_IMAGES/*.jpg; do
    
    echo _________________________________________________________________ >> $TEST_OUTPUT
    echo $filename >> $TEST_OUTPUT

        python3 -m scripts.label_image \
                    --graph=tf_files/retrained_graph.pb  \
                    --image=$filename >> $TEST_OUTPUT
    echo _________________________________________________________________ >> $TEST_OUTPUT

done
