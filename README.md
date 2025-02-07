# Currency Converter

## Overview
This is a simple currency converter web application that fetches real-time exchange rates using the ExchangeRate-API. It allows users to convert between USD and multiple other currencies, including EUR, AED, GBP, INR, and KWD.

## Features
- Fetches real-time exchange rates from ExchangeRate-API.
- Allows users to input an amount and select the currency to convert from and to.
- Stores exchange rates in local storage to reduce API calls.
- Provides a refresh button to update exchange rates every 5 minutes.

## Technologies Used
- JavaScript
- HTML
- ExchangeRate-API
- Local Storage

## Setup and Usage
1. Clone the repository or download the source files.
2. Open the `index.html` file in your browser.
3. Enter the amount in the input field and select the currencies for conversion.
4. Click the refresh button to update exchange rates manually.

## API Key
This project uses ExchangeRate-API. Replace the `apiKey` variable in the code with your own API key to ensure proper functionality.
```js
const apiKey = 'YOUR_API_KEY_HERE';
```

## Code Explanation
- The application fetches exchange rates from `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${source}`.
- Exchange rates are stored in local storage to avoid unnecessary API calls.
- Event listeners detect changes in input values and update the converted amount dynamically.
- A refresh button updates exchange rates every 5 minutes to ensure up-to-date conversions.

## Example Usage
1. Select `USD` in the "From" dropdown and `INR` in the "To" dropdown.
2. Enter `10` in the input field.
3. The converted amount will be displayed in the second input field.
4. Click the refresh button to update exchange rates if needed.
