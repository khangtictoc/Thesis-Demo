#!/bin/bash

# Store the path to the directory in a variable
src_folder=$1
des_folder=$2
temp_path=$HOME/Test_apk

# Global variable
NUM_FILE_SUCCESS=0

#################### DEFINE FUNCTION ###################

## HELP MENU
Help()
{
   # Display Help
   echo "Usage: AndroPy_autorun [SOURCE_FILE] [DESTINATION_FILE]"
   echo
   echo "Parameters:"
   echo "---"
   echo "SOURCE_FILE     	Folder contains APK files"
   echo "DESTINATION_FILE	Folder stores our output"
   echo "-h    			Print this Help."
   echo
   echo "Note1: You have running the script as root if your 'docker' is used with administrative privilege"
   echo "Note2: You should specify ABSOLUTE path for properly executing"
   echo "Note3: No trailing slash '/' when specifying PATH"
}

## File intro
initLog()
{
  echo "///////////////////////////////////////////////////////////////" > "$file_log"
  echo "//////////////// FILE ANALYSIS PROCESS CHECKER ////////////////" >> "$file_log"
  echo -e "///////////////////////////////////////////////////////////////\n\n" >> "$file_log"
  echo "WORKING DIRECTORY: $src_folder" >> "$file_log"
  echo "OUTPUT DIRECTORY: $des_folder" >> "$file_log"
  echo -e "\n\n" >> "$file_log"
}



################### MAIN FUNCTION ###################



# Get the options (if it has)
while getopts ":h" option; do
   case $option in
      h) # display Help
         Help
         exit ;;
      ?)
         echo "Invalid using"
         echo "Use -h for more help"
         exit ;;
   esac
done


# Pre-check
# Check whether 3 needed parameters exist?
if [[ -z $1 || -z $2  ]] 
then
  echo "Not enought parameters. Please check HELP"
  Help
  exit 0
fi

# Print general information
echo "Source file: ${src_folder^^}"
echo "Destination file: ${des_folder^^}"

# Use the built-in `readarray` command to store the list of files in an array
readarray -t files < <(find "$src_folder" -maxdepth 1 -type f)


echo "========== PREPROCESSING ==========="

# Create destination folder if it does not exist
if [[ -d "$des_folder" ]]
then
  echo "Destination folder found!!!"
else
  mkdir -p "$des_folder"
  echo ">>>>>>>> Create resulting folder successfully !!!"
fi


file_log="$des_folder/log_$(date +'%Y-%m-%d_%H:%M:%S').log"

# Add an output checker file
if [[ -e "$des_folder/log_$(date +'%Y-%m-%d_%H:%M:%S').log" ]]
then
  initLog
else
  echo ">>>>>>>>> FILE LOG CREATED !!!"
  initLog

fi

# Create TEMP folder for each processing loop 

if [[ -d "$temp_path" ]] 
then
  echo "TEMP folder found!!!"
  rm -dRf  "$temp_path"/*
  mkdir -p "$temp_path"
  echo ">>>>>>>> Create TEMP folder successfully !!!"
else
  mkdir -p "$temp_path"
  echo ">>>>>>>> Create TEMP folder successfully !!!"
fi

# Make folder for destination path

mkdir -p "$des_folder"/DroidBox_outputs/
mkdir -p "$des_folder"/Dynamic/Droidbox/
mkdir -p "$des_folder"/Dynamic/Strace/
mkdir -p "$des_folder"/Features_files/
mkdir -p "$des_folder"/FlowDroid_outputs/
mkdir -p "$des_folder"/FlowDroid_processed/
mkdir -p "$des_folder"/samples/BW/
mkdir -p "$des_folder"/samples/MW/
mkdir -p "$des_folder"/invalid_apks/
mkdir -p "$des_folder"/VT_analysis/


# Loop from 0 to the length of the array


echo "============== START EVALUATE ================"

for i in $(seq 0 $((${#files[@]} - 1))); do

  # Clear the container stored in the system
  echo "Y" | docker system prune

  # Remove all output and start new files
  echo "REMOVING ALL OUTPUT (IF TRUE)..."

  rm -dRf  "$temp_path"/*
  
  cp "${files[i]}" "$temp_path"

  # Start AndroPy
  echo "PROCESSING WITH ANDROPY ... ${file[i]}"
  docker run --volume=$temp_path:/apks alexmyg/andropytool -s /apks/ -vt a54d394ab2062917d31a22e60db6c43a3484aeefe423a0a842b49daaece136db -all

  # Check the condition
  if [[ -d  "$temp_path/DroidBox_outputs" && -d  "$temp_path/Dynamic" && -d  "$temp_path/Features_files" && -d  "$temp_path/FlowDroid_outputs" && -d  "$temp_path/FlowDroid_processed" && -d  "$temp_path/VT_analysis" ]]
  then
    if [[ -z $(ls -A "$temp_path/DroidBox_outputs") || -z $(ls -A "$temp_path/Dynamic") || -z $(ls -A "$temp_path/Features_files") || -z $(ls -A "$temp_path/FlowDroid_outputs") || -z $(ls -A "$temp_path/FlowDroid_processed") || -z $(ls -A "$temp_path/VT_analysis") ]]
    then 
      echo "${files[i]}: FAILED - Empty folder detected !!!" >> "$file_log"
    else
    
    # If successful, save the result to destination folder
    
      echo "${files[i]}: SUCCESSFUL !!!" >> "$file_log"
      cp -f "$temp_path"/DroidBox_outputs/* "$des_folder"/DroidBox_outputs/
      cp -f "$temp_path"/Dynamic/Droidbox/* "$des_folder"/Dynamic/Droidbox/
      cp -f "$temp_path"/Dynamic/Strace/* "$des_folder"/Dynamic/Strace/
      cp -f "$temp_path"/Features_files/* "$des_folder"/Features_files/
      cp -f "$temp_path"/FlowDroid_outputs/* "$des_folder"/FlowDroid_outputs/
      cp -f "$temp_path"/FlowDroid_processed/* "$des_folder"/FlowDroid_processed/
      cp -f "$temp_path"/VT_analysis/* "$des_folder"/VT_analysis/
      cp -f "$temp_path"/samples/BW/* "$des_folder"/samples/BW/
      cp -f "$temp_path"/samples/MW/* "$des_folder"/samples/MW/
      cp -f "$temp_path"/invalid_apks/* "$des_folder"/invalid_apks/  
      NUM_FILE_SUCCESS=$(($NUM_FILE_SUCCESS+1))
    fi
  else
    echo "${files[i]}: FAILED - No folder detected !!!" >> "$file_log"
  fi
   

done

# Remove temp_path

rm -dRf $temp_path

# Report to LOG file

NUM_FILE_FAIL=$((${#files[@]} - $NUM_FILE_SUCCESS))
SUCCESS_PERCENT=$(($NUM_FILE_SUCCESS / ${#files[@]}))

echo -e "\n\n" >> "$file_log" 
echo "Number of file successed: $NUM_FILE_SUCCESS ($SUCCESS_PERCENT%)" >> "$file_log" 
echo "Number of file failed: $NUM_FILE_FAIL ($((100 - $SUCCESS_PERCENT))%)" >> "$file_log" 

echo "============== FINISH EVALUATE ================"
