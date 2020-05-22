import csv

def fix_date(input_str):
    if len(input_str)<10:
        return('')
    else:
        return(input_str[6:10]+'-'+input_str[0:2]+'-'+input_str[3:5])

with open('gra_req_clean.csv', 'w', newline='') as out_csvfile:
    spamwriter = csv.writer(out_csvfile)
    with open('311_Service_Requests_-_Graffiti_Removal_-_No_Duplicates.csv') as in_csvfile:
        spamreader = csv.reader(in_csvfile)
        next(spamreader)
        for row in spamreader:
            write_row = [fix_date(row[0]),
            row[1],
            fix_date(row[2]),
            row[4],
            row[5],
            row[6],
            row[8],
            row[11],
            row[13],
            row[15],
            row[16]
            ]
            spamwriter.writerow(write_row)


