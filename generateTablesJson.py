import json
import random

tables = {}

# Tables in area 100
for table_id in range(3, 45):
    if table_id == 4:  # Exclude table number 4
        continue

    # Determine type based on odd/even and table_id range
    table_type = "spray" if (table_id % 2 == 1 and 25 <= table_id <= 43) or (table_id % 2 == 0 and 30 <= table_id <= 44) else "drip"

    tables[f"table_{table_id}"] = {
        "table_id": table_id,
        "computer": "100",  # Leave blank for now
        "plan": "",       # Leave blank for now
        "type": table_type,
        "full_or_empty":0,  # Random fullness between 0 and 100
        "notes": "",      # Leave blank for now
        "plot": "Ganei Am",
        "area": 100
    }

    

# Write the data to a JSON file
with open('tables.json', 'w') as f:
    json.dump(tables, f, indent=4)



# Load existing data from tables.json (if any)
try:
    with open('tables.json', 'r') as f:
        tables = json.load(f)
except FileNotFoundError:
    tables = {}  # Start with an empty dictionary if the file doesn't exist

# Tables in area 200
for table_id in range(201, 248):
    # Determine type based on odd/even and table_id range
    table_type = "spray" if 201 <= table_id <= 211 and table_id % 2 == 1 else "drip"
    computer = "200+300" if 201<= table_id <= 224 or 224 < table_id <=236 and table_id % 2 == 1 else "200"
    tables[f"table_{table_id}"] = {
        "table_id": table_id,
        "computer": computer,
        "plan": "",
        "type": table_type,
        "full_or_empty": 0,  # All tables are empty for now
        "notes": "",
        "plot": "Ganei Am",
        "area": 200
    }

# Write the updated data back to tables.json
with open('tables.json', 'w') as f:
    json.dump(tables, f, indent=4)




# Load existing data from tables.json
try:
    with open('tables.json', 'r') as f:
        tables = json.load(f)
except FileNotFoundError:
    tables = {}

# Tables in area 300
for table_id in range(300, 332):
    computer = "200+300" if 301 <= table_id <= 316 else "300+400"
    tables[f"table_{table_id}"] = {
        "table_id": table_id,
        "computer": computer,
        "plan": "",
        "type": "drip",  # All tables are drip
        "full_or_empty": 0,  # All tables are empty for now
        "notes": "",
        "plot": "Ganei Am",
        "area": 300
    }

# Write the updated data back to tables.json
with open('tables.json', 'w') as f:
    json.dump(tables, f, indent=4)


import json

# Load existing data from tables.json
try:
    with open('tables.json', 'r') as f:
        tables = json.load(f)
except FileNotFoundError:
    tables = {}

# Tables in area 400 (drip from 400 to 417)
for table_id in range(400, 418):
    tables[f"table_{table_id}"] = {
        "table_id": table_id,
        "computer": "300+400",
        "plan": "",
        "type": "drip",
        "full_or_empty": 0, 
        "notes": "",
        "plot": "Ganei Am",
        "area": 400
    }

# Tables in area 400 (spray from 450 to 455)
for table_id in range(450, 456):
    tables[f"table_{table_id}"] = {
        "table_id": table_id,
        "computer": "300+400",
        "plan": "",
        "type": "spray",
        "full_or_empty": 0,
        "notes": "",
        "plot": "Ganei Am",
        "area": 400
    }

# Write the updated data back to tables.json
with open('tables.json', 'w') as f:
    json.dump(tables, f, indent=4)


# Tables in area 500 (501-557 excluding 537, 539, 541)
for table_id in range(501, 558):
    if table_id in [537, 539, 541]:
        continue
    tables[f"table_{table_id}"] = {
        "table_id": table_id,
        "computer": "500",
        "plan": "",
        "type": "drip",
        "full_or_empty": 0,
        "notes": "",
        "plot": "Ganei Am",
        "area": 500
    }

# Tables in area 600 (601-636 excluding 635) and adding 650, 651
for table_id in range(601, 637):
    if table_id == 635:
        continue
    tables[f"table_{table_id}"] = {
        "table_id": table_id,
        "computer": "600",
        "plan": "",
        "type": "drip",
        "full_or_empty": 0,
        "notes": "",
        "plot": "Ganei Am",
        "area": 600
    }

# Add tables 650 and 651
for table_id in [650, 651]:
    tables[f"table_{table_id}"] = {
        "table_id": table_id,
        "computer": "600",
        "plan": "",
        "type": "drip",
        "full_or_empty": 0,
        "notes": "",
        "plot": "Ganei Am",
        "area": 600
    }

# Tables in area 700 (701-718 and 750)
for table_id in list(range(701, 719)) + [750]:
    tables[f"table_{table_id}"] = {
        "table_id": table_id,
        "computer": "700",
        "tap": "",
        "type": "drip",
        "full_or_empty": 0,
        "notes": "",
        "plot": "Ganei Am",
        "area": 700
    }

# Write the updated data back to tables.json
with open('tables.json', 'w') as f:
    json.dump(tables, f, indent=4)