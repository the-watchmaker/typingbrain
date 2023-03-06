SQL statements & functions
-- This query performs various data transformations using variables from another table
-- @hide WITH
-- @hide AS
WITH my_variables AS (
  -- Defines a Common Table Expression (CTE) that selects variable values from the `my_variable_table` table
  -- @hide SELECT
  SELECT
    -- @skip
    str1,
    str2,
    str3,
    str4,
    my_date,
    my_interval,
    my_null
  -- @hide FROM
  FROM my_variable_table
)

SELECT
  -- @hide CONCAT
  CONCAT(str1, ' ', str2) AS greeting, -- Concatenates the strings 'hello' and 'world' together to form the string 'hello world'
  -- @hide UPPER
  UPPER(str1) AS uppercase, -- Converts the string 'hello' to uppercase ('HELLO')
  -- @hide LOWER
  LOWER(str4) AS lowercase, -- Converts the string 'WORLD' to lowercase ('world')
  -- @hide SUBSTR
  SUBSTR(str3, 7, 5) AS substring, -- Extracts a five-character substring from the string 'hello world' starting at position 7, resulting in the string 'world'
  -- @hide TRIM
  TRIM('  ' || str3 || '  ') AS trimmed, -- Removes leading and trailing whitespace from the string '  hello world  ', resulting in the string 'hello world'
  -- @hide DATE_TRUNC
  DATE_TRUNC('month', my_date) AS month_start, -- Truncates the date '2022-01-15' to the start of the month ('2022-01-01')
  -- @hide DATE_ADD
  DATE_ADD(my_date, my_interval) AS next_week, -- Adds one week to the date '2022-01-15', resulting in the date '2022-01-22'
  -- @hide COALESCE
  COALESCE(my_null, 0, 1, my_null) AS first_nonnull, -- Returns the first non-null value in the list of values (in this case, 0)
  -- @hide NULLIF
  NULLIF(1, 1) AS nullif, -- Returns null because the two arguments are equal
  -- @hide NVL
  NVL(my_null, 'no value') AS nvl_null, -- Returns 'no value' if `my_null` is null, otherwise returns `my_null`
  -- @hide INTERVAL
  -- @hide AS
  -- @hide tomorrow
  my_date + INTERVAL '1 day' AS tomorrow, -- Adds one day to the date value in my_date
  my_interval * 2 AS double_interval, -- Multiplies the value in my_interval by 2
  -- @hide IS NULL AS
  my_null IS NULL AS is_null, -- Returns true if my_null is null, false otherwise
  -- @hide CAST
  CAST(my_null AS INT) + 1 AS casted_null, -- Returns null because my_null is null, but adds 1 after casting to INT type
  -- @hide COALESCE
  COALESCE(str1, str2, str3) AS coalesce, -- Returns the first non-null value from str1, str2, or str3
  -- @hide CONCAT_WS
  CONCAT_WS(', ', str1, str2, str3) AS concat_ws, -- Concatenates the strings str1, str2, and str3 together with a comma and space separator
  -- @hide DATE_PART
  DATE_PART('hour', my_date) AS hour, -- Extracts the hour component from the date value in my_date
  -- @hide STRPOS
  STRPOS(str1, 'l') AS strpos, -- Returns the position of the first occurrence of 'l' in the string str1
  -- @hide TRUNC
  TRUNC(my_interval) AS trunc_interval -- Truncates the decimal portion of my_interval, returning an integer
  -- @hide FLOOR
  FLOOR(4.7) AS floor_num, -- Returns the largest integer less than or equal to the given value (4)
  -- @hide CEILING
  CEILING(3.2) AS ceil_num, -- Returns the smallest integer greater than or equal to the given value (4)
  -- @hide DATE_TRUNC
  DATE_TRUNC('day', my_date) AS day_start, -- Truncates the date '2022-01-15' to the start of the day ('2022-01-15 00:00:00')
  -- @hide DATE_PART
  DATE_PART('doy', my_date) AS day_of_year, -- Returns the day of the year (15) for the date '2022-01-15'
  -- @hide REPLACE
  REPLACE(str4, 'R', 'r') AS replace_char, -- Replaces all occurrences of 'R' with 'r' in the string str4
  -- @hide ABS
  ABS(-5) AS absolute_val, -- Returns the absolute value (5) of -5
  -- @hide ROUND
  ROUND(3.14159, 2) AS rounded_pi, -- Rounds the number 3.14159 to 2 decimal places (3.14)
  -- @hide INTCAP
  INITCAP(str3) AS initcap_str -- Capitalizes the first letter of each word in the string str3
FROM my_table, my_variables;
