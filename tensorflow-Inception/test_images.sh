#!/bin/bash

export TEST_OUTPUT="./contrast_by_designer_full/contrast_by_designer_full_inception_output.txt"
export PATH_TO_TEST_IMAGES="./contrast_by_designer_full/test_images"

rm $TEST_OUTPUT

for filename in $PATH_TO_TEST_IMAGES/*.jpg; do
    
    echo _________________________________________________________________ >> $TEST_OUTPUT
    echo $filename >> $TEST_OUTPUT
            python3 label_image.py \
                    --graph=/tmp/output_graph.pb --labels=/tmp/output_labels.txt \
                    --input_layer=Placeholder \
                    --output_layer=final_result \
                    --input_height=299 --input_width=299 \
                    --image=$filename >> $TEST_OUTPUT
    echo _________________________________________________________________ >> $TEST_OUTPUT

done
