# GirlFriend Bot Discord.JS

## Installation | How to Use the Bot

1. **Install [Node.js V20](https://nodejs.org/en/) or higher:**

   - Visit the Node.js website and download the latest version of Node.js.

2. **Clone the Repository:**

   - Download this repository and unzip it, or use Git to clone it to your local machine.

     ```bash
     git clone https://github.com/your-username/GirlFriend-Bot-JavaScript.git
     ```

3. **Fill in Configuration:**

   - Open the `config.js` file and fill in the required information.

     ```javascript
     // config.js
     module.exports = {
       TOKEN: process.env.DISCORD_TOKEN,
     };
     ```

     Create a `.env` file in the root directory and set your Discord token:

     ```env
     DISCORD_TOKEN=your_bot_token_here
     ```

4. **Install Dependencies:**

   - Navigate to the project directory and install the required dependencies.

     ```bash
     npm install
     ```

5. **Start the Bot:**

   - Run the following command to start the bot.

     ```bash
     node index.js
     ```

## Configuration

Modify the `config.js` file to customize your bot. You can add more configuration options as needed.

```javascript
// config.js
require("dotenv").config();

module.exports = {
  token: process.env.DISCORD_TOKEN,
  // Add more configuration options here
};
```

## Contributing

If you find any bugs or have suggestions for improvements, feel free to open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
