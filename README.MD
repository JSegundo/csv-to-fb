# CSV-TO-FB

### Prerequisites:

- Node.js and npm installed on your machine
- A CSV file containing your offline conversions data
- A Facebook pixel ID and Facebook access token

### Setup:

- Clone the repository to your local machine
  `git clone https://github.com/JSegundo/csv-to-fb.git`

- Install the dependencies

`npm install`

- Start a local server to host the CSV file. You can use the http-server package for this.
  `npm i http-server -g`
  `cd ~path/to/csv/file => http-server`

- Start the node.js app
  `npm start`

- Make a GET request to the app, passing the url of the hosted CSV file as a query parameter.
  `curl -X GET http://localhost:3000/api/csv?url=http://127.0.0.1:8080/example-offline-conversions.csv`

Check the console logs and the status code for the response from the Facebook API.
