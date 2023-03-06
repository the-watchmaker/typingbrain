dbt commands
#!/bin/bash
# This script contains common dbt commands in Bash format

# Install dbt and its dependencies
pip install dbt

# Initialize a new dbt project
dbt init my_project

# Compile dbt project to generate SQL code
dbt compile

# Run dbt models in the project and create tables in the database
dbt run

# Test dbt models to ensure they are producing expected results
dbt test

# Generate documentation for dbt models and write to HTML files
dbt docs generate

# Serve the generated documentation on a local web server
dbt docs serve

# Generate a graph of dbt models and their dependencies
dbt deps

# List available dbt models in the project
dbt ls

# Generate a seed file to insert data into a table
dbt seed

# Clean dbt artifacts and remove generated SQL files and logs
dbt clean

# Run specific dbt models in the project
dbt run --models my_schema.my_model

# Run dbt models in debug mode for troubleshooting
dbt debug

# Run dbt models with verbose output for more detailed logging
dbt run --verbose

# Materialize a dbt model as a table
dbt run --materialized table

# Materialize a dbt model as a view
dbt run --materialized view

# Materialize a dbt model as an ephemeral table
dbt run --materialized ephemeral

# Materialize a dbt model as an incremental model
dbt run --materialized incremental

# Materialize a dbt model as a specific adapter-specific materialization
dbt run --materialized my_custom_materialization

# Materialize a specific dbt model as a view
dbt run --models my_schema.my_view --materialized view

# Materialize all dbt models as views
dbt run --materialized view --select my_schema

# Generate dbt models as incremental models instead of tables
dbt run --incremental

# Generate dbt models as snapshots to capture historical data
dbt run --snapshot

# Generate dbt models using SQL files instead of Jinja templates
dbt run --use-external-files

# Run dbt models in a specific order using tags
dbt run --tags my_tag

# Generate dbt models with a custom schema name
dbt run --schema my_custom_schema

# Override dbt profiles.yml settings using environment variables
DBT_PROFILE=my_profile dbt run

# Generate dbt models for multiple environments using profiles.yml files
dbt run --profiles-dir my_profiles_dir

