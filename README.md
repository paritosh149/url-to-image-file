# HTML Table to Chart Image file

## Introduction
    This program takes a Wikipedia url (https), chart type, mime type, output file name as input
    and emits a PNG file containing chart of a table found in html page returned by the given Url

## Requirements
    - Write a program in NodeJS/PHP/Java (or another language of your choice)
    - The program should accept a URL and give back an image file.
    - The input is a wikipedia URL
        e.g., https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression
    - The program then attempts to scan the page for a table
     - In the table it tries to find a numeric column
    - It then plots the numbers on an image as a chart that it writes to file

## Assumptions
    1. Only wikipedia URLs that return HTML content are supported.
    2. Table Titles and subtitles are not supported.
    3. Only first valid table would be rendered.
    4. Table headers are omitted.
    5. Default image size is set to 400 pixels.
    6. Image is saved in this program's  root directory.
    7. Colors of data points are randomized.
    8. Only html responses are allowed.
    9. Exactly two columns are required, one for x-axis labels and other for y-axis data plotting.
    10. Only PNG format is supported for output image file.
    11. Allowed chart types are : Line, Bar, Radar, Pie, Doughnut, Polar Area


## Project Folder Structure
    .
    ├── constants/               # Constants files
    ├── app/                     # APP Source files
    ├── tests/                   # Automated tests
    ├── index.js                 # Entry point
    ├── package.json
    └── README.md

## How to run

### Pre-requisites
    [ ] Node JS version 14.x.x or above must be installed

### Steps

1. Clone this repo to a local directory

    ```git clone https://github.com/paritosh149/url-to-chart-image-converter.git your-local-directory```

2. Go to your local directory

    ```cd your-local-directory```

3. Install test dependencies (if test cases are to be executed)

    ```npm i```

4. Run the app

    ```npm start```

5. Run tests

    ```npm test```

## To Do (Pending Tasks)
    [x] Error handling
    [x] Re-factoring
    [x] Promises
