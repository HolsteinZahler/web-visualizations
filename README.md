# Web Visualizations

# Setup

1. Export data to `311_Service_Requests_-_Graffiti_Removal_-_No_Duplicates.csv` from the  [Chicago data portal](https://data.cityofchicago.org/Service-Requests/311-Service-Requests-Graffiti-Removal-No-Duplicate/8tus-apua)
2. Run python script `data_munge.py` to extract relevant data.
3. Create a local database to store data for subsequent analysis.
```
createdb graffiti
```
4. Use postgreSQL to run the ``schema.sql`` file to create the `GraffitiData` table 
```
psql -d graffiti -f schema.sql
```
5. Use postgreSQL to load the cleaned csv into the newly created table.
```
psql -d graffiti -c "COPY GraffitiData(creation_date,status,completion_date,type_of_service_request,surface_type,graffiti_location,zip,ward,community_area,latitude,longitude) FROM 'path_to_file/gra_req_clean.csv' WITH DELIMITER ',' CSV;"
```

# Notes
Demographic data from [Chicago data portal](https://data.cityofchicago.org/Health-Human-Services/Per-Capita-Income/r6ad-wvtk)

2010 Census data from [CMAP Data Hub](https://datahub.cmap.illinois.gov/dataset/2010-census-data-summarized-to-chicago-community-areas/resource/b30b47bf-bb0d-46b6-853b-47270fb7f626?inner_span=True)