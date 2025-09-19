import json


def is_json_valid(json_string: str) -> bool:
    """
    Check if the provided string is a valid JSON.
    
    Args:
        json_string (str): The string to check.
        
    Returns:
        bool: True if the string is valid JSON, False otherwise.
    """
    try:
        json.loads(json_string)
        return True
    except ValueError:
        return False