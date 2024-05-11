#!/bin/bash

# download the audio
sudo yt-dlp -x -f m4a $1 -o ../audio/$2.m4a
# sudo yt-dlp -x -f m4a https://www.youtube.com/watch?v=AzrfJws6l_o -o ../audio/elkriver.m4a


AWS_REGION="ap-southeast-2"
S3_BUCKET_NAME="practice-audio"
LOCAL_DIR="../audio"
DATA_FILE_OUTPUT="./src/audioFiles.ts"

# make alist of the files for the app to read
contents=("$LOCAL_DIR"/*)

directory_contents=()
for file in "${contents[@]}"; do
  directory_contents+=("'$(basename "$file")',")
done

ts_code="export const songs: string[] = [${directory_contents[@]}];"

echo "$ts_code" > "$DATA_FILE_OUTPUT"

echo "File created successfully: $DATA_FILE_OUTPUT"

# sync audio to the S3 bucket
aws s3 sync "$LOCAL_DIR" "s3://$S3_BUCKET_NAME" --region "$AWS_REGION"