import json
import os

file_path = os.path.dirname(os.path.realpath(__file__))

def readFile(file_name) -> str:
    """
    If the file is a .txt file, it reads the file and returns its content as a string.
    If the file is a .json file, it reads the file and returns its content as a dictionary.
    If the file name has no extension, it tries to read it as a .json file first, then as a .txt file.
    """
    if file_name.endswith('.txt'):
        return readTxtFile(file_name)
    elif file_name.endswith('.json'):
        # Delete the '.json' extension and try to read it as a JSON file first
        file_name = file_name.replace('.json', '')
        try:
            with open(f'{file_path}/{file_name +".json"}', 'r') as file:
                # Attempt to read the file as JSON
                json_data = json.load(file)
                # Process the JSON data here
                return json_data
        except FileNotFoundError:
            # Try reading it as a text file if JSON fails
            return readTxtFile(file_name + '.txt')
    
def readJsonFile(file_name) -> dict:
    """Reads a JSON file and returns its content as a dictionary. """
    try:
        # Try to read the file as json first
        with open(f'{file_path}/{file_name}', 'r') as file:
            json_data = json.load(file)
            # Process the JSON data here
            return json_data
    except FileNotFoundError:
        # If the file is not found, try reading it as a text file
        return readTxtFile(file_name)
        # print(f"File '{file_path}' not found.")
    except json.JSONDecodeError:
        
        print(f"Failed to decode JSON in file '{file_path}'.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def readTxtFile(file_name) -> str:
    try:
        with open(f'{file_path}/{file_name}', 'r') as file:
            data = file.read()
            return data
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")