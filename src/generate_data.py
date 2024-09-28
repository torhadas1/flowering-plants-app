import json
import random

# Create lists of possible values
plot_names = ['Plot A', 'Plot B', 'Plot C', 'Plot D', 'Plot E', 'Plot F']
flower_types = ['Roses', 'Tulips', 'Sunflowers', 'Daisies', 'Lilies', 'Orchids', 'Carnations', 'Hydrangeas', 'Lavender', 'Peonies', 'Zinnias', 'Marigolds', 'Geraniums', 'Petunias', 'Begonias', 'Snapdragons', 'Pansies', 'Impatiens', 'Salvia', 'Cosmos', 'Dahlias', 'Gladiolus', 'Irises', 'Hostas', 'Ferns', 'Succulents', 'Cacti', 'Bamboo', 'Palms', 'Coneflowers', 'Black-Eyed Susans', 'Asters', 'Chrysanthemums', 'Poppies', 'Bluebells', 'Foxgloves', 'Delphiniums', 'Lupines', 'Hollyhocks', 'Morning Glories', 'Clematis', 'Wisteria', 'Jasmine', 'Gardenias', 'Hibiscus']
irrigation_systems = ['Drip', 'Sprinkler', 'Flood']
irrigation_plans = ['Plan 1', 'Plan 2', 'Plan 3', 'Plan 4', 'Plan 5']

# Create the growing_tables dictionary
growing_tables = {}
table_id = 1

# Calculate tables per plot (ensuring total is 500)
tables_per_plot = 500 // len(plot_names)
remainder = 500 % len(plot_names)

for plot in plot_names:
    for row in range(1, 51):  # Assuming 50 rows per plot
        for col in range(1, 11):  # 10 tables per row
            if table_id > 500:
                break 

            flower_type = random.choice(flower_types)
            quantity = random.randint(10, 100)
            irrigation_system = random.choice(irrigation_systems)
            irrigation_plan = random.choice(irrigation_plans)
            location = f'Row {row}, Column {col}'

            growing_tables[f'table_{table_id}'] = {
                'plot': plot,
                'flower_type': flower_type,
                'quantity': quantity,
                'irrigation_system': irrigation_system,
                'irrigation_plan': irrigation_plan,
                'location': location
            }
            table_id += 1

    # Distribute remainder tables if any
    if remainder > 0:
        for _ in range(remainder):
            if table_id > 500:
                break

            flower_type = random.choice(flower_types)
            quantity = random.randint(10, 100)
            irrigation_system = random.choice(irrigation_systems)
            irrigation_plan = random.choice(irrigation_plans)
            # Choose a random row and column within the plot
            location = f'Row {random.randint(1, 50)}, Column {random.randint(1, 10)}'

            growing_tables[f'table_{table_id}'] = {
                'plot': plot,
                'flower_type': flower_type,
                'quantity': quantity,
                'irrigation_system': irrigation_system,
                'irrigation_plan': irrigation_plan,
                'location': location
            }
            table_id += 1
        remainder = 0  # Reset remainder after distributing

# Write the data to a JSON file
with open('growing_tables.json', 'w') as f:
    json.dump(growing_tables, f, indent=4)